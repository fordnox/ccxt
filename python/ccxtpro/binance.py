# -*- coding: utf-8 -*-

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

import ccxtpro
import ccxt.async_support as ccxt
from ccxt.base.errors import ExchangeError
from ccxt.base.errors import NotSupported


class binance(ccxtpro.Exchange, ccxt.binance):

    def describe(self):
        return self.deep_extend(super(binance, self).describe(), {
            'has': {
                'watchOrderBook': True,
                'watchOHLCV': True,
                'watchTrades': True,
            },
            'urls': {
                'api': {
                    'ws': 'wss://stream.binance.com:9443/ws',
                    # 'ws': 'wss://echo.websocket.org/',
                    # 'ws': 'ws://127.0.0.1:8080',
                },
            },
            'options': {
                # 'marketsByLowercaseId': {},
                'subscriptions': {},
                'messages': {},
                'watchOrderBookRate': 100,  # get updated every 100ms or None(1000ms)
            },
        })

    async def load_markets(self, reload=False, params={}):
        markets = await super(binance, self).load_markets(reload, params)
        marketsByLowercaseId = self.safe_value(self.options, 'marketsByLowercaseId')
        if (marketsByLowercaseId is None) or reload:
            marketsByLowercaseId = {}
            for i in range(0, len(self.symbols)):
                symbol = self.symbols[i]
                market = self.markets[symbol]
                lowercaseId = self.safe_string_lower(market, 'id')
                market['lowercaseId'] = lowercaseId
                self.markets_by_id[market['id']] = market
                self.markets[symbol] = market
                marketsByLowercaseId[lowercaseId] = self.markets[symbol]
            self.options['marketsByLowercaseId'] = marketsByLowercaseId
        return markets

    async def watch_trades(self, symbol):
        #     await self.load_markets()
        #     market = self.market(symbol)
        #     url = self.urls['api']['ws'] + market['id'].lower() + '@trade'
        #     return await self.WsTradesMessage(url, url)
        raise NotSupported(self.id + ' watchTrades not implemented yet')

    def handle_trades(self, response):
        #     parsed = self.parse_trade(response)
        #     parsed['symbol'] = self.parseSymbol(response)
        #     return parsed
        raise NotSupported(self.id + ' handleTrades not implemented yet')

    async def watch_ohlcv(self, symbol, timeframe='1m', since=None, limit=None, params={}):
        #     await self.load_markets()
        #     interval = self.timeframes[timeframe]
        #     market = self.market(symbol)
        #     url = self.urls['api']['ws'] + market['id'].lower() + '@kline_' + interval
        #     return await self.WsOHLCVMessage(url, url)
        raise NotSupported(self.id + ' watchOHLCV not implemented yet')

    def handle_ohlcv(self, ohlcv):
        #     data = ohlcv['k']
        #     timestamp = self.safe_integer(data, 'T')
        #     open = self.safe_float(data, 'o')
        #     high = self.safe_float(data, 'h')
        #     close = self.safe_float(data, 'l')
        #     low = self.safe_float(data, 'c')
        #     volume = self.safe_float(data, 'v')
        #     return [timestamp, open, high, close, low, volume]
        raise NotSupported(self.id + ' handleOHLCV not implemented yet ' + self.json(ohlcv))

    async def watch_order_book(self, symbol, limit=None, params={}):
        #
        # https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#partial-book-depth-streams
        #
        # <symbol>@depth<levels>@100ms or <symbol>@depth<levels>(1000ms)
        # valid <levels> are 5, 10, or 20
        #
        if limit is not None:
            if (limit != 5) and (limit != 10) and (limit != 20):
                raise ExchangeError(self.id + ' watchOrderBook limit argument must be None, 5, 10 or 20')
        await self.load_markets()
        market = self.market(symbol)
        #
        # https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#how-to-manage-a-local-order-book-correctly
        #
        # 1. Open a stream to wss://stream.binance.com:9443/ws/bnbbtc@depth.
        # 2. Buffer the events you receive from the stream.
        # 3. Get a depth snapshot from https://www.binance.com/api/v1/depth?symbol=BNBBTC&limit=1000 .
        # 4. Drop any event where u is <= lastUpdateId in the snapshot.
        # 5. The first processed event should have U <= lastUpdateId+1 AND u >= lastUpdateId+1.
        # 6. While listening to the stream, each new event's U should be equal to the previous event's u+1.
        # 7. The data in each event is the absolute quantity for a price level.
        # 8. If the quantity is 0, remove the price level.
        # 9. Receiving an event that removes a price level that is not in your local order book can happen and is normal.
        #
        name = 'depth'
        messageHash = market['lowercaseId'] + '@' + name
        url = self.urls['api']['ws']  # + '/' + messageHash
        requestId = self.nonce()
        request = {
            'method': 'SUBSCRIBE',
            'params': [
                messageHash + '@' + self.safe_string(self.options, 'watchOrderBookRate', 100) + 'ms',
            ],
            'id': requestId,
        }
        requestId = str(requestId)
        self.options['subscriptions'][requestId] = {
            'requestId': requestId,
            'messageHash': messageHash,
            'name': name,
            'symbol': symbol,
            'method': self.handle_order_book_subscription,
        }
        future = self.watch(url, messageHash, self.extend(request, params), messageHash)
        return await self.after(future, self.limit_order_book, symbol, limit, params)

    def limit_order_book(self, orderbook, symbol, limit=None, params={}):
        return orderbook.limit(limit)

    async def fetch_order_book_snapshot(self, client, message, subscription):
        # print(new Date(), 'fetchOrderBookSnapshot...')
        symbol = self.safe_string(subscription, 'symbol')
        if symbol in self.orderbooks:
            del self.orderbooks[symbol]
        messageHash = self.safe_string(subscription, 'messageHash')
        # todo: self is sync in php - make it async
        snapshot = await self.fetch_order_book(symbol)
        orderbook = self.limited_order_book()
        orderbook.reset(snapshot)
        # push the deltas
        messages = self.safe_value(self.options['messages'], messageHash, [])
        # print(new Date(), 'fetchOrderBookSnapshot', len(messages), 'messages', snapshot)
        for i in range(0, len(messages)):
            message = messages[i]
            # print(new Date(), message)
            self.handle_order_book_message(client, message, orderbook)
        self.orderbooks[symbol] = orderbook
        client.resolve(orderbook, messageHash)

    def handle_delta(self, bookside, delta):
        price = self.safe_float(delta, 0)
        amount = self.safe_float(delta, 1)
        bookside.store(price, amount)

    def handle_deltas(self, bookside, deltas):
        for i in range(0, len(deltas)):
            self.handle_delta(bookside, deltas[i])

    def handle_order_book_message(self, client, message, orderbook):
        # print(new Date(), '-------------------------', message)
        u = self.safe_integer_2(message, 'u', 'lastUpdateId')
        if u > orderbook['nonce']:
            # print(new Date(), 'merging...')
            U = self.safe_integer(message, 'U')
            if (U is not None) and ((U - 1) > orderbook['nonce']):
                raise ExchangeError(self.id + ' handleOrderBook received an out-of-order nonce')
            self.handle_deltas(orderbook['asks'], self.safe_value(message, 'a', []))
            self.handle_deltas(orderbook['bids'], self.safe_value(message, 'b', []))
            orderbook['nonce'] = u
            timestamp = self.safe_integer(message, 'E')
            orderbook['timestamp'] = timestamp
            orderbook['datetime'] = self.iso8601(timestamp)

    def handle_order_book(self, client, message):
        #
        # initial snapshot is fetched with ccxt's fetchOrderBook
        # the feed does not include a snapshot, just the deltas
        #
        #     {
        #         "e": "depthUpdate",  # Event type
        #         "E": 1577554482280,  # Event time
        #         "s": "BNBBTC",  # Symbol
        #         "U": 157,  # First update ID in event
        #         "u": 160,  # Final update ID in event
        #         "b": [ # bids
        #             ["0.0024", "10"],  # price, size
        #         ],
        #         "a": [ # asks
        #             ["0.0026", "100"],  # price, size
        #         ]
        #     }
        #
        marketId = self.safe_string(message, 's')
        market = None
        symbol = None
        if marketId is not None:
            if marketId in self.markets_by_id:
                market = self.markets_by_id[marketId]
                symbol = market['symbol']
        name = 'depth'
        messageHash = market['lowercaseId'] + '@' + name
        if symbol in self.orderbooks:
            orderbook = self.orderbooks[symbol]
            nonce = orderbook['nonce']
            # print(new Date(), messageHash, 'initialized', message)
            self.handle_order_book_message(client, message, orderbook)
            if nonce < orderbook['nonce']:
                client.resolve(orderbook, messageHash)
        else:
            # print(new Date(), messageHash, 'caching', message)
            # accumulate deltas
            self.options['messages'][messageHash] = self.safe_value(self.options['messages'], messageHash, [])
            self.options['messages'][messageHash].append(message)

    def sign_message(self, client, messageHash, message, params={}):
        # todo: binance signMessage not implemented yet
        return message

    def handle_order_book_subscription(self, client, message, subscription):
        messageHash = self.safe_string(subscription, 'messageHash')
        # print(messageHash)
        # sys.exit()
        self.options['messages'][messageHash] = []
        # fetch the snapshot in a separate async call
        self.spawn(self.fetch_order_book_snapshot, client, message, subscription)

    def handle_subscription_status(self, client, message):
        #
        #     {
        #         "result": null,
        #         "id": 1574649734450
        #     }
        #
        requestId = self.safe_string(message, 'id')
        subscription = self.safe_value(self.options['subscriptions'], requestId, {})
        method = self.safe_value(subscription, 'method')
        if method is not None:
            self.call(method, client, message, subscription)
        return message

    def handle_message(self, client, message):
        methods = {
            'depthUpdate': self.handle_order_book,
        }
        event = self.safe_string(message, 'e')
        method = self.safe_value(methods, event)
        if method is None:
            requestId = self.safe_string(message, 'id')
            if requestId is not None:
                return self.handle_subscription_status(client, message)
            return message
        else:
            return self.call(method, client, message)
        # print(message)
        # sys.exit()
        #
        # keys = list(client.futures.keys())
        # for i in range(0, len(keys)):
        #     key = keys[i]
        #     client.reject()
        # }
        #
        # --------------------------------------------------------------------
        #
        # print(new Date(), json.dumps(message, null, 4))
        # print('---------------------------------------------------------')
        # if isinstance(message, list):
        #     channelId = str(message[0])
        #     subscriptionStatus = self.safe_value(self.options['subscriptionStatusByChannelId'], channelId, {})
        #     subscription = self.safe_value(subscriptionStatus, 'subscription', {})
        #     name = self.safe_string(subscription, 'name')
        #     methods = {
        #         'book': 'handleOrderBook',
        #         'ohlc': 'handleOHLCV',
        #         'ticker': 'handleTicker',
        #         'trade': 'handleTrades',
        #     }
        #     method = self.safe_string(methods, name)
        #     if method is None:
        #         return message
        #     else:
        #         return getattr(self, method)(client, message)
        #     }
        # else:
        #     if self.handleErrorMessage(client, message):
        #         event = self.safe_string(message, 'event')
        #         methods = {
        #             'heartbeat': 'handleHeartbeat',
        #             'systemStatus': 'handleSystemStatus',
        #             'subscriptionStatus': 'handleSubscriptionStatus',
        #         }
        #         method = self.safe_string(methods, event)
        #         if method is None:
        #             return message
        #         else:
        #             return getattr(self, method)(client, message)
        #         }
        #     }
        # }
