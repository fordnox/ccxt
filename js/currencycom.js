'use strict';

//  ---------------------------------------------------------------------------

const ccxt = require ('ccxt');
const { BadSymbol, BadRequest, ExchangeError, NotSupported } = require ('ccxt/js/base/errors');
const { ArrayCache } = require ('./base/Cache');

//  ---------------------------------------------------------------------------

module.exports = class currencycom extends ccxt.currencycom {
    describe () {
        return this.deepExtend (super.describe (), {
            'has': {
                'ws': true,
                'watchTicker': true,
                'watchTickers': false, // for now
                'watchTrades': true,
                'watchOrderBook': true,
                // 'watchStatus': true,
                // 'watchHeartbeat': true,
                'watchOHLCV': true,
            },
            'urls': {
                'api': {
                    'ws': 'wss://api-adapter.backend.currency.com/connect',
                },
            },
            'options': {
                'tradesLimit': 1000,
                'OHLCVLimit': 1000,
            },
            'exceptions': {
                'ws': {
                    'exact': {
                        'Event(s) not found': BadRequest,
                    },
                    'broad': {
                        'Currency pair not in ISO 4217-A3 format': BadSymbol,
                    },
                },
            },
        });
    }

    handleTicker (client, message, subscription) {
        //
        //     {
        //         status: 'OK',
        //         correlationId: '1',
        //         payload: {
        //             tickers: [
        //                 {
        //                     symbol: '1COV',
        //                     priceChange: '-0.29',
        //                     priceChangePercent: '-0.80',
        //                     prevClosePrice: '36.33',
        //                     lastPrice: '36.04',
        //                     openPrice: '36.33',
        //                     highPrice: '36.46',
        //                     lowPrice: '35.88',
        //                     openTime: 1595548800000,
        //                     closeTime: 1595795305401
        //                 }
        //             ]
        //         }
        //     }
        //
        const symbol = this.safeString (subscription, 'symbol');
        const name = this.safeString (subscription, 'name');
        const messageHash = name + ':' + symbol;
        const market = this.market (symbol);
        const payload = this.safeValue (message, 'payload');
        const tickers = this.safeValue (payload, 'tickers', []);
        for (let i = 0; i < tickers.length; i++) {
            const ticker = this.parseTicker (tickers[i], market);
            this.tickers[symbol] = ticker;
            client.resolve (ticker, messageHash);
            if (messageHash in client.subscriptions) {
                delete client.subscriptions[messageHash];
            }
        }
    }

    async watchBalance (params = {}) {
        await this.loadMarkets ();
        throw new NotSupported (this.id + ' watchBalance() not implemented yet');
    }

    handleTrades (client, message, subscription) {
        //
        //     [
        //         0, // channelID
        //         [ //     price        volume         time             side type misc
        //             [ "5541.20000", "0.15850568", "1534614057.321597", "s", "l", "" ],
        //             [ "6060.00000", "0.02455000", "1534614057.324998", "b", "l", "" ],
        //         ],
        //         "trade",
        //         "XBT/USD"
        //     ]
        //
        const wsName = this.safeString (message, 3);
        const name = this.safeString (message, 2);
        const messageHash = name + ':' + wsName;
        const market = this.safeValue (this.options['marketsByWsName'], wsName);
        const symbol = market['symbol'];
        let stored = this.safeValue (this.trades, symbol);
        if (stored === undefined) {
            const limit = this.safeInteger (this.options, 'tradesLimit', 1000);
            stored = new ArrayCache (limit);
            this.trades[symbol] = stored;
        }
        const trades = this.safeValue (message, 1, []);
        const parsed = this.parseTrades (trades, market);
        for (let i = 0; i < parsed.length; i++) {
            stored.append (parsed[i]);
        }
        client.resolve (stored, messageHash);
    }

    findTimeframe (timeframe) {
        const keys = Object.keys (this.timeframes);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (this.timeframes[key] === timeframe) {
                return key;
            }
        }
        return undefined;
    }

    handleOHLCV (client, message, subscription) {
        //
        //     [
        //         216, // channelID
        //         [
        //             '1574454214.962096', // Time, seconds since epoch
        //             '1574454240.000000', // End timestamp of the interval
        //             '0.020970', // Open price at midnight UTC
        //             '0.020970', // Intraday high price
        //             '0.020970', // Intraday low price
        //             '0.020970', // Closing price at midnight UTC
        //             '0.020970', // Volume weighted average price
        //             '0.08636138', // Accumulated volume today
        //             1, // Number of trades today
        //         ],
        //         'ohlc-1', // Channel Name of subscription
        //         'ETH/XBT', // Asset pair
        //     ]
        //
        const info = this.safeValue (subscription, 'subscription', {});
        const interval = this.safeInteger (info, 'interval');
        const name = this.safeString (info, 'name');
        const wsName = this.safeString (message, 3);
        const market = this.safeValue (this.options['marketsByWsName'], wsName);
        const symbol = market['symbol'];
        const timeframe = this.findTimeframe (interval);
        const duration = this.parseTimeframe (timeframe);
        if (timeframe !== undefined) {
            const candle = this.safeValue (message, 1);
            const messageHash = name + ':' + timeframe + ':' + wsName;
            let timestamp = this.safeFloat (candle, 1);
            timestamp -= duration;
            const result = [
                parseInt (timestamp * 1000),
                this.safeFloat (candle, 2),
                this.safeFloat (candle, 3),
                this.safeFloat (candle, 4),
                this.safeFloat (candle, 5),
                this.safeFloat (candle, 7),
            ];
            this.ohlcvs[symbol] = this.safeValue (this.ohlcvs, symbol, {});
            let stored = this.safeValue (this.ohlcvs[symbol], timeframe);
            if (stored === undefined) {
                const limit = this.safeInteger (this.options, 'OHLCVLimit', 1000);
                stored = new ArrayCache (limit);
                this.ohlcvs[symbol][timeframe] = stored;
            }
            const length = stored.length;
            if (length && result[0] === stored[length - 1][0]) {
                stored[length - 1] = result;
            } else {
                stored.append (result);
            }
            client.resolve (stored, messageHash);
        }
    }

    requestId () {
        // their support said that reqid must be an int32, not documented
        const reqid = this.sum (this.safeInteger (this.options, 'reqid', 0), 1);
        this.options['reqid'] = reqid;
        return reqid;
    }

    async watchPublic (name, symbol, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const messageHash = name + ':' + symbol;
        const url = this.urls['api']['ws'];
        const requestId = this.requestId ().toString ();
        const request = this.deepExtend (params, {
            'destination': name,
            'correlationId': requestId,
            'payload': {
                'symbol': market['id'],
            },
        });
        const subscription = this.extend (request, {
            'messageHash': messageHash,
            'symbol': symbol,
            'name': name,
        });
        return await this.watch (url, messageHash, request, messageHash, subscription);
    }

    async watchTicker (symbol, params = {}) {
        return await this.watchPublic ('/api/v1/ticker/24hr', symbol, params);
    }

    // async watchTrades (symbol, since = undefined, limit = undefined, params = {}) {
    //     const name = 'trade';
    //     const future = this.watchPublic (name, symbol, params);
    //     return await this.after (future, this.filterBySinceLimit, since, limit, 'timestamp', true);
    // }

    async watchOrderBook (symbol, limit = undefined, params = {}) {
        const name = 'book';
        const request = {};
        if (limit !== undefined) {
            if ((limit === 10) || (limit === 25) || (limit === 100) || (limit === 500) || (limit === 1000)) {
                request['subscription'] = {
                    'depth': limit, // default 10, valid options 10, 25, 100, 500, 1000
                };
            } else {
                throw new NotSupported (this.id + ' watchOrderBook accepts limit values of 10, 25, 100, 500 and 1000 only');
            }
        }
        const future = this.watchPublic ('/api/v1/depth', symbol, this.extend (request, params));
        return await this.after (future, this.limitOrderBook, symbol, limit, params);
    }

    // async watchOHLCV (symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
    //     await this.loadMarkets ();
    //     const name = 'ohlc';
    //     const market = this.market (symbol);
    //     const wsName = this.safeValue (market['info'], 'wsname');
    //     const messageHash = name + ':' + timeframe + ':' + wsName;
    //     const url = this.urls['api']['ws']['public'];
    //     const requestId = this.requestId ();
    //     const subscribe = {
    //         'event': 'subscribe',
    //         'reqid': requestId,
    //         'pair': [
    //             wsName,
    //         ],
    //         'subscription': {
    //             'name': name,
    //             'interval': this.timeframes[timeframe],
    //         },
    //     };
    //     const request = this.deepExtend (subscribe, params);
    //     const future = this.watch (url, messageHash, request, messageHash);
    //     return await this.after (future, this.filterBySinceLimit, since, limit, 0, true);
    // }

    // async loadMarkets (reload = false, params = {}) {
    //     const markets = await super.loadMarkets (reload, params);
    //     let marketsByWsName = this.safeValue (this.options, 'marketsByWsName');
    //     if ((marketsByWsName === undefined) || reload) {
    //         marketsByWsName = {};
    //         for (let i = 0; i < this.symbols.length; i++) {
    //             const symbol = this.symbols[i];
    //             const market = this.markets[symbol];
    //             if (!market['darkpool']) {
    //                 const info = this.safeValue (market, 'info', {});
    //                 const wsName = this.safeString (info, 'wsname');
    //                 marketsByWsName[wsName] = market;
    //             }
    //         }
    //         this.options['marketsByWsName'] = marketsByWsName;
    //     }
    //     return markets;
    // }

    // async watchHeartbeat (params = {}) {
    //     await this.loadMarkets ();
    //     const event = 'heartbeat';
    //     const url = this.urls['api']['ws']['public'];
    //     return await this.watch (url, event);
    // }

    // handleHeartbeat (client, message) {
    //     //
    //     // every second (approx) if no other updates are sent
    //     //
    //     //     { "event": "heartbeat" }
    //     //
    //     const event = this.safeString (message, 'event');
    //     client.resolve (message, event);
    // }

    // handleOrderBook (client, message, subscription) {
    //     //
    //     // first message (snapshot)
    //     //
    //     //     [
    //     //         1234, // channelID
    //     //         {
    //     //             "as": [
    //     //                 [ "5541.30000", "2.50700000", "1534614248.123678" ],
    //     //                 [ "5541.80000", "0.33000000", "1534614098.345543" ],
    //     //                 [ "5542.70000", "0.64700000", "1534614244.654432" ]
    //     //             ],
    //     //             "bs": [
    //     //                 [ "5541.20000", "1.52900000", "1534614248.765567" ],
    //     //                 [ "5539.90000", "0.30000000", "1534614241.769870" ],
    //     //                 [ "5539.50000", "5.00000000", "1534613831.243486" ]
    //     //             ]
    //     //         },
    //     //         "book-10",
    //     //         "XBT/USD"
    //     //     ]
    //     //
    //     // subsequent updates
    //     //
    //     //     [
    //     //         1234,
    //     //         { // optional
    //     //             "a": [
    //     //                 [ "5541.30000", "2.50700000", "1534614248.456738" ],
    //     //                 [ "5542.50000", "0.40100000", "1534614248.456738" ]
    //     //             ]
    //     //         },
    //     //         { // optional
    //     //             "b": [
    //     //                 [ "5541.30000", "0.00000000", "1534614335.345903" ]
    //     //             ]
    //     //         },
    //     //         "book-10",
    //     //         "XBT/USD"
    //     //     ]
    //     //
    //     const messageLength = message.length;
    //     const wsName = message[messageLength - 1];
    //     const bookDepthString = message[messageLength - 2];
    //     const parts = bookDepthString.split ('-');
    //     const depth = this.safeInteger (parts, 1, 10);
    //     const market = this.safeValue (this.options['marketsByWsName'], wsName);
    //     const symbol = market['symbol'];
    //     let timestamp = undefined;
    //     const messageHash = 'book:' + wsName;
    //     // if this is a snapshot
    //     if ('as' in message[1]) {
    //         // todo get depth from marketsByWsName
    //         this.orderbooks[symbol] = this.orderBook ({}, depth);
    //         const orderbook = this.orderbooks[symbol];
    //         const sides = {
    //             'as': 'asks',
    //             'bs': 'bids',
    //         };
    //         const keys = Object.keys (sides);
    //         for (let i = 0; i < keys.length; i++) {
    //             const key = keys[i];
    //             const side = sides[key];
    //             const bookside = orderbook[side];
    //             const deltas = this.safeValue (message[1], key, []);
    //             timestamp = this.handleDeltas (bookside, deltas, timestamp);
    //         }
    //         orderbook['timestamp'] = timestamp;
    //         orderbook['datetime'] = this.iso8601 (timestamp);
    //         client.resolve (orderbook, messageHash);
    //     } else {
    //         const orderbook = this.orderbooks[symbol];
    //         // else, if this is an orderbook update
    //         let a = undefined;
    //         let b = undefined;
    //         if (messageLength === 5) {
    //             a = this.safeValue (message[1], 'a', []);
    //             b = this.safeValue (message[2], 'b', []);
    //         } else {
    //             if ('a' in message[1]) {
    //                 a = this.safeValue (message[1], 'a', []);
    //             } else {
    //                 b = this.safeValue (message[1], 'b', []);
    //             }
    //         }
    //         if (a !== undefined) {
    //             timestamp = this.handleDeltas (orderbook['asks'], a, timestamp);
    //         }
    //         if (b !== undefined) {
    //             timestamp = this.handleDeltas (orderbook['bids'], b, timestamp);
    //         }
    //         orderbook['timestamp'] = timestamp;
    //         orderbook['datetime'] = this.iso8601 (timestamp);
    //         client.resolve (orderbook, messageHash);
    //     }
    // }

    // handleDeltas (bookside, deltas, timestamp) {
    //     for (let j = 0; j < deltas.length; j++) {
    //         const delta = deltas[j];
    //         const price = parseFloat (delta[0]);
    //         const amount = parseFloat (delta[1]);
    //         timestamp = Math.max (timestamp || 0, parseInt (parseFloat (delta[2]) * 1000));
    //         bookside.store (price, amount);
    //     }
    //     return timestamp;
    // }


    // handleErrorMessage (client, message) {
    //     //
    //     //     {
    //     //         errorMessage: 'Currency pair not in ISO 4217-A3 format foobar',
    //     //         event: 'subscriptionStatus',
    //     //         pair: 'foobar',
    //     //         reqid: 1574146735269,
    //     //         status: 'error',
    //     //         subscription: { name: 'ticker' }
    //     //     }
    //     //
    //     const errorMessage = this.safeValue (message, 'errorMessage');
    //     if (errorMessage !== undefined) {
    //         const requestId = this.safeValue (message, 'reqid');
    //         if (requestId !== undefined) {
    //             const broad = this.exceptions['ws']['broad'];
    //             const broadKey = this.findBroadlyMatchedKey (broad, errorMessage);
    //             let exception = undefined;
    //             if (broadKey === undefined) {
    //                 exception = new ExchangeError (errorMessage);
    //             } else {
    //                 exception = new broad[broadKey] (errorMessage);
    //             }
    //             client.reject (exception, requestId);
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    signMessage (client, messageHash, message, params = {}) {
        // todo: signMessage not implemented yet
        return message;
    }

    handleMessage (client, message) {
        console.dir (message, { depth: null });
        //
        //     {
        //         status: 'OK',
        //         correlationId: '1',
        //         payload: {
        //             tickers: [
        //                 {
        //                     symbol: '1COV',
        //                     priceChange: '-0.29',
        //                     priceChangePercent: '-0.80',
        //                     prevClosePrice: '36.33',
        //                     lastPrice: '36.04',
        //                     openPrice: '36.33',
        //                     highPrice: '36.46',
        //                     lowPrice: '35.88',
        //                     openTime: 1595548800000,
        //                     closeTime: 1595795305401
        //                 }
        //             ]
        //         }
        //     }
        //
        const subscriptionsById = this.indexBy (client.subscriptions, 'correlationId');
        const requestId = this.safeString (message, 'correlationId');
        const status = this.safeString (message, 'status');
        const subscription = this.safeValue (subscriptionsById, requestId);
        if (subscription !== undefined) {
            if (status === 'OK') {
                const name = this.safeString (subscription, 'name');
                if (name !== undefined) {
                    const methods = {
                        'ww': this.handleTrades,
                        '/api/v1/ticker/24hr': this.handleTicker,
                        '/api/v1/depth': this.handleOrderBook,
                        'zz': this.handleOHCLV,
                    };
                    const method = this.safeValue (methods, name);
                    if (method === undefined) {
                        return message;
                    } else {
                        return method.call (this, client, message, subscription);
                    }
                }
            }
        }
    }
};
