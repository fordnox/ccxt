<?php

namespace ccxt\async;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

use Exception; // a common import
use ccxt\async\abstract\coinspot as Exchange;
use ccxt\ExchangeError;
use ccxt\ArgumentsRequired;
use React\Async;

class coinspot extends Exchange {

    public function describe() {
        return $this->deep_extend(parent::describe(), array(
            'id' => 'coinspot',
            'name' => 'CoinSpot',
            'countries' => array( 'AU' ), // Australia
            'rateLimit' => 1000,
            'has' => array(
                'CORS' => null,
                'spot' => true,
                'margin' => false,
                'swap' => false,
                'future' => false,
                'option' => false,
                'addMargin' => false,
                'cancelOrder' => true,
                'createMarketOrder' => false,
                'createOrder' => true,
                'createReduceOnlyOrder' => false,
                'createStopLimitOrder' => false,
                'createStopMarketOrder' => false,
                'createStopOrder' => false,
                'fetchBalance' => true,
                'fetchBorrowRate' => false,
                'fetchBorrowRateHistories' => false,
                'fetchBorrowRateHistory' => false,
                'fetchBorrowRates' => false,
                'fetchBorrowRatesPerSymbol' => false,
                'fetchFundingHistory' => false,
                'fetchFundingRate' => false,
                'fetchFundingRateHistory' => false,
                'fetchFundingRates' => false,
                'fetchIndexOHLCV' => false,
                'fetchLeverage' => false,
                'fetchLeverageTiers' => false,
                'fetchMarginMode' => false,
                'fetchMarkOHLCV' => false,
                'fetchOpenInterestHistory' => false,
                'fetchOrderBook' => true,
                'fetchPosition' => false,
                'fetchPositionMode' => false,
                'fetchPositions' => false,
                'fetchPositionsRisk' => false,
                'fetchPremiumIndexOHLCV' => false,
                'fetchTicker' => true,
                'fetchTickers' => true,
                'fetchTrades' => true,
                'fetchTradingFee' => false,
                'fetchTradingFees' => false,
                'reduceMargin' => false,
                'setLeverage' => false,
                'setMarginMode' => false,
                'setPositionMode' => false,
            ),
            'urls' => array(
                'logo' => 'https://user-images.githubusercontent.com/1294454/28208429-3cacdf9a-6896-11e7-854e-4c79a772a30f.jpg',
                'api' => array(
                    'public' => 'https://www.coinspot.com.au/pubapi',
                    'private' => 'https://www.coinspot.com.au/api',
                ),
                'www' => 'https://www.coinspot.com.au',
                'doc' => 'https://www.coinspot.com.au/api',
                'referral' => 'https://www.coinspot.com.au/register?code=PJURCU',
            ),
            'api' => array(
                'public' => array(
                    'get' => array(
                        'latest',
                    ),
                ),
                'private' => array(
                    'post' => array(
                        'orders',
                        'orders/history',
                        'my/coin/deposit',
                        'my/coin/send',
                        'quote/buy',
                        'quote/sell',
                        'my/balances',
                        'my/orders',
                        'my/buy',
                        'my/sell',
                        'my/buy/cancel',
                        'my/sell/cancel',
                        'ro/my/balances',
                        'ro/my/balances/{cointype}',
                        'ro/my/deposits',
                        'ro/my/withdrawals',
                        'ro/my/transactions',
                        'ro/my/transactions/{cointype}',
                        'ro/my/transactions/open',
                        'ro/my/transactions/{cointype}/open',
                        'ro/my/sendreceive',
                        'ro/my/affiliatepayments',
                        'ro/my/referralpayments',
                    ),
                ),
            ),
            'markets' => array(
                'ADA/AUD' => array( 'id' => 'ada', 'symbol' => 'ADA/AUD', 'base' => 'ADA', 'quote' => 'AUD', 'baseId' => 'ada', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'BTC/AUD' => array( 'id' => 'btc', 'symbol' => 'BTC/AUD', 'base' => 'BTC', 'quote' => 'AUD', 'baseId' => 'btc', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'ETH/AUD' => array( 'id' => 'eth', 'symbol' => 'ETH/AUD', 'base' => 'ETH', 'quote' => 'AUD', 'baseId' => 'eth', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'XRP/AUD' => array( 'id' => 'xrp', 'symbol' => 'XRP/AUD', 'base' => 'XRP', 'quote' => 'AUD', 'baseId' => 'xrp', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'LTC/AUD' => array( 'id' => 'ltc', 'symbol' => 'LTC/AUD', 'base' => 'LTC', 'quote' => 'AUD', 'baseId' => 'ltc', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'DOGE/AUD' => array( 'id' => 'doge', 'symbol' => 'DOGE/AUD', 'base' => 'DOGE', 'quote' => 'AUD', 'baseId' => 'doge', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'RFOX/AUD' => array( 'id' => 'rfox', 'symbol' => 'RFOX/AUD', 'base' => 'RFOX', 'quote' => 'AUD', 'baseId' => 'rfox', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'POWR/AUD' => array( 'id' => 'powr', 'symbol' => 'POWR/AUD', 'base' => 'POWR', 'quote' => 'AUD', 'baseId' => 'powr', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'NEO/AUD' => array( 'id' => 'neo', 'symbol' => 'NEO/AUD', 'base' => 'NEO', 'quote' => 'AUD', 'baseId' => 'neo', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'TRX/AUD' => array( 'id' => 'trx', 'symbol' => 'TRX/AUD', 'base' => 'TRX', 'quote' => 'AUD', 'baseId' => 'trx', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'EOS/AUD' => array( 'id' => 'eos', 'symbol' => 'EOS/AUD', 'base' => 'EOS', 'quote' => 'AUD', 'baseId' => 'eos', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'XLM/AUD' => array( 'id' => 'xlm', 'symbol' => 'XLM/AUD', 'base' => 'XLM', 'quote' => 'AUD', 'baseId' => 'xlm', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'RHOC/AUD' => array( 'id' => 'rhoc', 'symbol' => 'RHOC/AUD', 'base' => 'RHOC', 'quote' => 'AUD', 'baseId' => 'rhoc', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
                'GAS/AUD' => array( 'id' => 'gas', 'symbol' => 'GAS/AUD', 'base' => 'GAS', 'quote' => 'AUD', 'baseId' => 'gas', 'quoteId' => 'aud', 'type' => 'spot', 'spot' => true ),
            ),
            'commonCurrencies' => array(
                'DRK' => 'DASH',
            ),
            'options' => array(
                'fetchBalance' => 'private_post_my_balances',
            ),
            'precisionMode' => TICK_SIZE,
        ));
    }

    public function parse_balance($response) {
        $result = array( 'info' => $response );
        $balances = $this->safe_value_2($response, 'balance', 'balances');
        if (gettype($balances) === 'array' && array_keys($balances) === array_keys(array_keys($balances))) {
            for ($i = 0; $i < count($balances); $i++) {
                $currencies = $balances[$i];
                $currencyIds = is_array($currencies) ? array_keys($currencies) : array();
                for ($j = 0; $j < count($currencyIds); $j++) {
                    $currencyId = $currencyIds[$j];
                    $balance = $currencies[$currencyId];
                    $code = $this->safe_currency_code($currencyId);
                    $account = $this->account();
                    $account['total'] = $this->safe_string($balance, 'balance');
                    $result[$code] = $account;
                }
            }
        } else {
            $currencyIds = is_array($balances) ? array_keys($balances) : array();
            for ($i = 0; $i < count($currencyIds); $i++) {
                $currencyId = $currencyIds[$i];
                $code = $this->safe_currency_code($currencyId);
                $account = $this->account();
                $account['total'] = $this->safe_string($balances, $currencyId);
                $result[$code] = $account;
            }
        }
        return $this->safe_balance($result);
    }

    public function fetch_balance($params = array ()) {
        return Async\async(function () use ($params) {
            /**
             * query for balance and get the amount of funds available for trading or funds locked in orders
             * @param {array} $params extra parameters specific to the coinspot api endpoint
             * @return {array} a ~@link https://docs.ccxt.com/en/latest/manual.html?#balance-structure balance structure~
             */
            Async\await($this->load_markets());
            $method = $this->safe_string($this->options, 'fetchBalance', 'private_post_my_balances');
            $response = Async\await($this->$method ($params));
            //
            // read-write api keys
            //
            //     ...
            //
            // read-only api keys
            //
            //     {
            //         "status":"ok",
            //         "balances":array(
            //             {
            //                 "LTC":array("balance":0.1,"audbalance":16.59,"rate":165.95)
            //             }
            //         )
            //     }
            //
            return $this->parse_balance($response);
        }) ();
    }

    public function fetch_order_book(string $symbol, ?int $limit = null, $params = array ()) {
        return Async\async(function () use ($symbol, $limit, $params) {
            /**
             * fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
             * @param {string} $symbol unified $symbol of the $market to fetch the order book for
             * @param {int|null} $limit the maximum amount of order book entries to return
             * @param {array} $params extra parameters specific to the coinspot api endpoint
             * @return {array} A dictionary of ~@link https://docs.ccxt.com/#/?id=order-book-structure order book structures~ indexed by $market symbols
             */
            Async\await($this->load_markets());
            $market = $this->market($symbol);
            $request = array(
                'cointype' => $market['id'],
            );
            $orderbook = Async\await($this->privatePostOrders (array_merge($request, $params)));
            return $this->parse_order_book($orderbook, $market['symbol'], null, 'buyorders', 'sellorders', 'rate', 'amount');
        }) ();
    }

    public function parse_ticker($ticker, $market = null) {
        //
        //     {
        //         "btc":{
        //             "bid":"51970",
        //             "ask":"53000",
        //             "last":"52806.47"
        //         }
        //     }
        //
        $symbol = $this->safe_symbol(null, $market);
        $last = $this->safe_string($ticker, 'last');
        return $this->safe_ticker(array(
            'symbol' => $symbol,
            'timestamp' => null,
            'datetime' => null,
            'high' => null,
            'low' => null,
            'bid' => $this->safe_string($ticker, 'bid'),
            'bidVolume' => null,
            'ask' => $this->safe_string($ticker, 'ask'),
            'askVolume' => null,
            'vwap' => null,
            'open' => null,
            'close' => $last,
            'last' => $last,
            'previousClose' => null,
            'change' => null,
            'percentage' => null,
            'average' => null,
            'baseVolume' => null,
            'quoteVolume' => null,
            'info' => $ticker,
        ), $market);
    }

    public function fetch_ticker(string $symbol, $params = array ()) {
        return Async\async(function () use ($symbol, $params) {
            /**
             * fetches a price $ticker, a statistical calculation with the information calculated over the past 24 hours for a specific $market
             * @param {string} $symbol unified $symbol of the $market to fetch the $ticker for
             * @param {array} $params extra parameters specific to the coinspot api endpoint
             * @return {array} a ~@link https://docs.ccxt.com/#/?$id=$ticker-structure $ticker structure~
             */
            Async\await($this->load_markets());
            $market = $this->market($symbol);
            $response = Async\await($this->publicGetLatest ($params));
            $id = $market['id'];
            $id = strtolower($id);
            $prices = $this->safe_value($response, 'prices');
            //
            //     {
            //         "status":"ok",
            //         "prices":{
            //             "btc":{
            //                 "bid":"52732.47000022",
            //                 "ask":"53268.0699976",
            //                 "last":"53284.03"
            //             }
            //         }
            //     }
            //
            $ticker = $this->safe_value($prices, $id);
            return $this->parse_ticker($ticker, $market);
        }) ();
    }

    public function fetch_tickers(?array $symbols = null, $params = array ()) {
        return Async\async(function () use ($symbols, $params) {
            /**
             * fetches price tickers for multiple markets, statistical calculations with the information calculated over the past 24 hours each $market
             * @see https://www.coinspot.com.au/api#latestprices
             * @param {[string]|null} $symbols unified $symbols of the markets to fetch the $ticker for, all $market tickers are returned if not assigned
             * @param {array} $params extra parameters specific to the coinspot api endpoint
             * @return {array} a dictionary of ~@link https://docs.ccxt.com/#/?$id=$ticker-structure $ticker structures~
             */
            Async\await($this->load_markets());
            $response = Async\await($this->publicGetLatest ($params));
            //
            //    {
            //        "status" => "ok",
            //        "prices" => {
            //        "btc" => array(
            //        "bid" => "25050",
            //        "ask" => "25370",
            //        "last" => "25234"
            //        ),
            //        "ltc" => {
            //        "bid" => "79.39192993",
            //        "ask" => "87.98",
            //        "last" => "87.95"
            //        }
            //      }
            //    }
            //
            $result = array();
            $prices = $this->safe_value($response, 'prices');
            $ids = is_array($prices) ? array_keys($prices) : array();
            for ($i = 0; $i < count($ids); $i++) {
                $id = $ids[$i];
                $market = $this->safe_market($id);
                if ($market['spot']) {
                    $symbol = $market['symbol'];
                    $ticker = $prices[$id];
                    $result[$symbol] = $this->parse_ticker($ticker, $market);
                }
            }
            return $this->filter_by_array($result, 'symbol', $symbols);
        }) ();
    }

    public function fetch_trades(string $symbol, ?int $since = null, ?int $limit = null, $params = array ()) {
        return Async\async(function () use ($symbol, $since, $limit, $params) {
            /**
             * get the list of most recent $trades for a particular $symbol
             * @param {string} $symbol unified $symbol of the $market to fetch $trades for
             * @param {int|null} $since timestamp in ms of the earliest trade to fetch
             * @param {int|null} $limit the maximum amount of $trades to fetch
             * @param {array} $params extra parameters specific to the coinspot api endpoint
             * @return {[array]} a list of ~@link https://docs.ccxt.com/en/latest/manual.html?#public-$trades trade structures~
             */
            Async\await($this->load_markets());
            $market = $this->market($symbol);
            $request = array(
                'cointype' => $market['id'],
            );
            $response = Async\await($this->privatePostOrdersHistory (array_merge($request, $params)));
            //
            //     {
            //         "status":"ok",
            //         "orders":array(
            //             array("amount":0.00102091,"rate":21549.09999991,"total":21.99969168,"coin":"BTC","solddate":1604890646143,"market":"BTC/AUD"),
            //         ),
            //     }
            //
            $trades = $this->safe_value($response, 'orders', array());
            return $this->parse_trades($trades, $market, $since, $limit);
        }) ();
    }

    public function parse_trade($trade, $market = null) {
        //
        // public fetchTrades
        //
        //     {
        //         "amount":0.00102091,
        //         "rate":21549.09999991,
        //         "total":21.99969168,
        //         "coin":"BTC",
        //         "solddate":1604890646143,
        //         "market":"BTC/AUD"
        //     }
        //
        $priceString = $this->safe_string($trade, 'rate');
        $amountString = $this->safe_string($trade, 'amount');
        $costString = $this->safe_number($trade, 'total');
        $timestamp = $this->safe_integer($trade, 'solddate');
        $marketId = $this->safe_string($trade, 'market');
        $symbol = $this->safe_symbol($marketId, $market, '/');
        return $this->safe_trade(array(
            'info' => $trade,
            'id' => null,
            'symbol' => $symbol,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
            'order' => null,
            'type' => null,
            'side' => null,
            'takerOrMaker' => null,
            'price' => $priceString,
            'amount' => $amountString,
            'cost' => $costString,
            'fee' => null,
        ), $market);
    }

    public function create_order(string $symbol, $type, string $side, $amount, $price = null, $params = array ()) {
        return Async\async(function () use ($symbol, $type, $side, $amount, $price, $params) {
            /**
             * create a trade order
             * @see https://www.coinspot.com.au/api#placebuyorder
             * @param {string} $symbol unified $symbol of the $market to create an order in
             * @param {string} $type must be 'limit'
             * @param {string} $side 'buy' or 'sell'
             * @param {float} $amount how much of currency you want to trade in units of base currency
             * @param {float|null} $price the $price at which the order is to be fullfilled, in units of the quote currency, ignored in $market orders
             * @param {array} $params extra parameters specific to the coinspot api endpoint
             * @return {array} an ~@link https://docs.ccxt.com/#/?id=order-structure order structure~
             */
            Async\await($this->load_markets());
            $method = 'privatePostMy' . $this->capitalize($side);
            if ($type === 'market') {
                throw new ExchangeError($this->id . ' createOrder() allows limit orders only');
            }
            $market = $this->market($symbol);
            $request = array(
                'cointype' => $market['id'],
                'amount' => $amount,
                'rate' => $price,
            );
            return Async\await($this->$method (array_merge($request, $params)));
        }) ();
    }

    public function cancel_order(string $id, ?string $symbol = null, $params = array ()) {
        return Async\async(function () use ($id, $symbol, $params) {
            /**
             * cancels an open order
             * @param {string} $id order $id
             * @param {string|null} $symbol not used by coinspot cancelOrder ()
             * @param {array} $params extra parameters specific to the coinspot api endpoint
             * @return {array} An ~@link https://docs.ccxt.com/#/?$id=order-structure order structure~
             */
            $side = $this->safe_string($params, 'side');
            if ($side !== 'buy' && $side !== 'sell') {
                throw new ArgumentsRequired($this->id . ' cancelOrder() requires a $side parameter, "buy" or "sell"');
            }
            $params = $this->omit($params, 'side');
            $method = 'privatePostMy' . $this->capitalize($side) . 'Cancel';
            $request = array(
                'id' => $id,
            );
            return Async\await($this->$method (array_merge($request, $params)));
        }) ();
    }

    public function sign($path, $api = 'public', $method = 'GET', $params = array (), $headers = null, $body = null) {
        $url = $this->urls['api'][$api] . '/' . $path;
        if ($api === 'private') {
            $this->check_required_credentials();
            $nonce = $this->nonce();
            $body = $this->json(array_merge(array( 'nonce' => $nonce ), $params));
            $headers = array(
                'Content-Type' => 'application/json',
                'key' => $this->apiKey,
                'sign' => $this->hmac($this->encode($body), $this->encode($this->secret), 'sha512'),
            );
        }
        return array( 'url' => $url, 'method' => $method, 'body' => $body, 'headers' => $headers );
    }
}
