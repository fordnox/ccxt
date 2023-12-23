'use strict';

var bitmart$1 = require('./abstract/bitmart.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var number = require('./base/functions/number.js');
var sha256 = require('./static_dependencies/noble-hashes/sha256.js');

//  ---------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class bitmart
 * @augments Exchange
 */
class bitmart extends bitmart$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'bitmart',
            'name': 'BitMart',
            'countries': ['US', 'CN', 'HK', 'KR'],
            // 150 per 5 seconds = 30 per second
            // rateLimit = 1000ms / 30 ~= 33.334
            'rateLimit': 33.34,
            'version': 'v2',
            'certified': true,
            'pro': true,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': true,
                'swap': true,
                'future': false,
                'option': false,
                'borrowCrossMargin': false,
                'borrowIsolatedMargin': true,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'cancelOrders': false,
                'createMarketBuyOrderWithCost': true,
                'createMarketOrderWithCost': false,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createPostOnlyOrder': true,
                'createStopLimitOrder': false,
                'createStopMarketOrder': false,
                'createStopOrder': false,
                'fetchBalance': true,
                'fetchBorrowInterest': true,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchCanceledOrders': true,
                'fetchClosedOrders': true,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchCurrencies': true,
                'fetchDeposit': true,
                'fetchDepositAddress': true,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': true,
                'fetchDepositWithdrawFee': true,
                'fetchDepositWithdrawFees': false,
                'fetchFundingHistory': undefined,
                'fetchFundingRate': true,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIsolatedBorrowRate': true,
                'fetchIsolatedBorrowRates': true,
                'fetchLiquidations': false,
                'fetchMarginMode': false,
                'fetchMarkets': true,
                'fetchMyLiquidations': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterest': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchOrderTrades': true,
                'fetchPosition': true,
                'fetchPositionMode': false,
                'fetchPositions': true,
                'fetchStatus': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': true,
                'fetchTradingFees': false,
                'fetchTransactionFee': true,
                'fetchTransactionFees': false,
                'fetchTransfer': false,
                'fetchTransfers': true,
                'fetchWithdrawAddressesByNetwork': false,
                'fetchWithdrawal': true,
                'fetchWithdrawals': true,
                'reduceMargin': false,
                'repayCrossMargin': false,
                'repayIsolatedMargin': true,
                'setLeverage': true,
                'setMarginMode': false,
                'transfer': true,
                'withdraw': true,
            },
            'hostname': 'bitmart.com',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/129991357-8f47464b-d0f4-41d6-8a82-34122f0d1398.jpg',
                'api': {
                    'rest': 'https://api-cloud.{hostname}', // bitmart.info for Hong Kong users
                },
                'www': 'https://www.bitmart.com/',
                'doc': 'https://developer-pro.bitmart.com/',
                'referral': {
                    'url': 'http://www.bitmart.com/?r=rQCFLh',
                    'discount': 0.3,
                },
                'fees': 'https://www.bitmart.com/fee/en',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': true,
            },
            'api': {
                'public': {
                    'get': {
                        'system/time': 3,
                        'system/service': 3,
                        // spot markets
                        'spot/v1/currencies': 7.5,
                        'spot/v1/symbols': 7.5,
                        'spot/v1/symbols/details': 5,
                        'spot/quotation/v3/tickers': 6,
                        'spot/quotation/v3/ticker': 4,
                        'spot/quotation/v3/lite-klines': 5,
                        'spot/quotation/v3/klines': 7,
                        'spot/quotation/v3/books': 4,
                        'spot/quotation/v3/trades': 4,
                        'spot/v1/ticker': 5,
                        'spot/v2/ticker': 30,
                        'spot/v1/ticker_detail': 5,
                        'spot/v1/steps': 30,
                        'spot/v1/symbols/kline': 6,
                        'spot/v1/symbols/book': 5,
                        'spot/v1/symbols/trades': 5,
                        // contract markets
                        'contract/v1/tickers': 15,
                        'contract/public/details': 5,
                        'contract/public/depth': 5,
                        'contract/public/open-interest': 30,
                        'contract/public/funding-rate': 30,
                        'contract/public/kline': 6,
                        'account/v1/currencies': 30,
                    },
                },
                'private': {
                    'get': {
                        // sub-account
                        'account/sub-account/v1/transfer-list': 7.5,
                        'account/sub-account/v1/transfer-history': 7.5,
                        'account/sub-account/main/v1/wallet': 5,
                        'account/sub-account/main/v1/subaccount-list': 7.5,
                        'account/contract/sub-account/main/v1/wallet': 5,
                        'account/contract/sub-account/main/v1/transfer-list': 7.5,
                        'account/contract/sub-account/v1/transfer-history': 7.5,
                        // account
                        'account/v1/wallet': 5,
                        'account/v1/currencies': 30,
                        'spot/v1/wallet': 5,
                        'account/v1/deposit/address': 30,
                        'account/v1/withdraw/charge': 32,
                        'account/v2/deposit-withdraw/history': 7.5,
                        'account/v1/deposit-withdraw/detail': 7.5,
                        // order
                        'spot/v1/order_detail': 1,
                        'spot/v2/orders': 5,
                        'spot/v1/trades': 5,
                        // newer order endpoint
                        'spot/v2/trades': 5,
                        'spot/v3/orders': 5,
                        'spot/v2/order_detail': 1,
                        // margin
                        'spot/v1/margin/isolated/borrow_record': 1,
                        'spot/v1/margin/isolated/repay_record': 1,
                        'spot/v1/margin/isolated/pairs': 30,
                        'spot/v1/margin/isolated/account': 5,
                        'spot/v1/trade_fee': 30,
                        'spot/v1/user_fee': 30,
                        // broker
                        'spot/v1/broker/rebate': 1,
                        // contract
                        'contract/private/assets-detail': 5,
                        'contract/private/order': 1.2,
                        'contract/private/order-history': 10,
                        'contract/private/position': 10,
                        'contract/private/get-open-orders': 1.2,
                        'contract/private/trades': 10,
                    },
                    'post': {
                        // sub-account endpoints
                        'account/sub-account/main/v1/sub-to-main': 30,
                        'account/sub-account/sub/v1/sub-to-main': 30,
                        'account/sub-account/main/v1/main-to-sub': 30,
                        'account/sub-account/sub/v1/sub-to-sub': 30,
                        'account/sub-account/main/v1/sub-to-sub': 30,
                        'account/contract/sub-account/main/v1/sub-to-main': 7.5,
                        'account/contract/sub-account/main/v1/main-to-sub': 7.5,
                        'account/contract/sub-account/sub/v1/sub-to-main': 7.5,
                        // account
                        'account/v1/withdraw/apply': 7.5,
                        // transaction and trading
                        'spot/v1/submit_order': 1,
                        'spot/v1/batch_orders': 1,
                        'spot/v2/cancel_order': 1,
                        'spot/v1/cancel_orders': 15,
                        'spot/v4/query/order': 1,
                        'spot/v4/query/client-order': 1,
                        'spot/v4/query/open-orders': 5,
                        'spot/v4/query/history-orders': 5,
                        'spot/v4/query/trades': 5,
                        'spot/v4/query/order-trades': 5,
                        // newer endpoint
                        'spot/v3/cancel_order': 1,
                        'spot/v2/batch_orders': 1,
                        'spot/v2/submit_order': 1,
                        // margin
                        'spot/v1/margin/submit_order': 1,
                        'spot/v1/margin/isolated/borrow': 30,
                        'spot/v1/margin/isolated/repay': 30,
                        'spot/v1/margin/isolated/transfer': 30,
                        // contract
                        'account/v1/transfer-contract-list': 60,
                        'account/v1/transfer-contract': 60,
                        'contract/private/submit-order': 2.5,
                        'contract/private/cancel-order': 1.5,
                        'contract/private/cancel-orders': 30,
                        'contract/private/submit-plan-order': 2.5,
                        'contract/private/cancel-plan-order': 1.5,
                        'contract/private/submit-leverage': 2.5,
                    },
                },
            },
            'timeframes': {
                '1m': 1,
                '3m': 3,
                '5m': 5,
                '15m': 15,
                '30m': 30,
                '45m': 45,
                '1h': 60,
                '2h': 120,
                '3h': 180,
                '4h': 240,
                '1d': 1440,
                '1w': 10080,
                '1M': 43200,
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'taker': this.parseNumber('0.0025'),
                    'maker': this.parseNumber('0.0025'),
                    'tiers': {
                        'taker': [
                            [this.parseNumber('0'), this.parseNumber('0.0020')],
                            [this.parseNumber('10'), this.parseNumber('0.18')],
                            [this.parseNumber('50'), this.parseNumber('0.0016')],
                            [this.parseNumber('250'), this.parseNumber('0.0014')],
                            [this.parseNumber('1000'), this.parseNumber('0.0012')],
                            [this.parseNumber('5000'), this.parseNumber('0.0010')],
                            [this.parseNumber('25000'), this.parseNumber('0.0008')],
                            [this.parseNumber('50000'), this.parseNumber('0.0006')],
                        ],
                        'maker': [
                            [this.parseNumber('0'), this.parseNumber('0.001')],
                            [this.parseNumber('10'), this.parseNumber('0.0009')],
                            [this.parseNumber('50'), this.parseNumber('0.0008')],
                            [this.parseNumber('250'), this.parseNumber('0.0007')],
                            [this.parseNumber('1000'), this.parseNumber('0.0006')],
                            [this.parseNumber('5000'), this.parseNumber('0.0005')],
                            [this.parseNumber('25000'), this.parseNumber('0.0004')],
                            [this.parseNumber('50000'), this.parseNumber('0.0003')],
                        ],
                    },
                },
            },
            'precisionMode': number.TICK_SIZE,
            'exceptions': {
                'exact': {
                    // general errors
                    '30000': errors.ExchangeError,
                    '30001': errors.AuthenticationError,
                    '30002': errors.AuthenticationError,
                    '30003': errors.AccountSuspended,
                    '30004': errors.AuthenticationError,
                    '30005': errors.AuthenticationError,
                    '30006': errors.AuthenticationError,
                    '30007': errors.AuthenticationError,
                    '30008': errors.AuthenticationError,
                    '30010': errors.PermissionDenied,
                    '30011': errors.AuthenticationError,
                    '30012': errors.AuthenticationError,
                    '30013': errors.RateLimitExceeded,
                    '30014': errors.ExchangeNotAvailable,
                    // funding account errors
                    '60000': errors.BadRequest,
                    '60001': errors.BadRequest,
                    '60002': errors.BadRequest,
                    '60003': errors.ExchangeError,
                    '60004': errors.ExchangeError,
                    '60005': errors.ExchangeError,
                    '60006': errors.ExchangeError,
                    '60007': errors.InvalidAddress,
                    '60008': errors.InsufficientFunds,
                    '60009': errors.ExchangeError,
                    '60010': errors.ExchangeError,
                    '60011': errors.InvalidAddress,
                    '60012': errors.ExchangeError,
                    '60020': errors.PermissionDenied,
                    '60021': errors.PermissionDenied,
                    '60022': errors.PermissionDenied,
                    '60030': errors.BadRequest,
                    '60031': errors.BadRequest,
                    '60050': errors.ExchangeError,
                    '60051': errors.ExchangeError,
                    '61001': errors.InsufficientFunds,
                    '61003': errors.BadRequest,
                    // spot errors
                    '50000': errors.BadRequest,
                    '50001': errors.BadSymbol,
                    '50002': errors.BadRequest,
                    '50003': errors.BadRequest,
                    '50004': errors.BadRequest,
                    '50005': errors.OrderNotFound,
                    '50006': errors.InvalidOrder,
                    '50007': errors.InvalidOrder,
                    '50008': errors.InvalidOrder,
                    '50009': errors.InvalidOrder,
                    '50010': errors.InvalidOrder,
                    '50011': errors.InvalidOrder,
                    '50012': errors.InvalidOrder,
                    '50013': errors.InvalidOrder,
                    '50014': errors.BadRequest,
                    '50015': errors.BadRequest,
                    '50016': errors.BadRequest,
                    '50017': errors.BadRequest,
                    '50018': errors.BadRequest,
                    '50019': errors.BadRequest,
                    '51004': errors.InsufficientFunds,
                    // '50019': ExchangeError, // 400, Invalid status. validate status is [1=Failed, 2=Success, 3=Frozen Failed, 4=Frozen Success, 5=Partially Filled, 6=Fully Fulled, 7=Canceling, 8=Canceled
                    '50020': errors.InsufficientFunds,
                    '50021': errors.BadRequest,
                    '50022': errors.ExchangeNotAvailable,
                    '50023': errors.BadSymbol,
                    '50029': errors.InvalidOrder,
                    '50030': errors.InvalidOrder,
                    '50032': errors.OrderNotFound,
                    // below Error codes used interchangeably for both failed postOnly and IOC orders depending on market price and order side
                    '50035': errors.InvalidOrder,
                    '50034': errors.InvalidOrder,
                    '51011': errors.InvalidOrder,
                    '53000': errors.AccountSuspended,
                    '53001': errors.AccountSuspended,
                    '57001': errors.BadRequest,
                    '58001': errors.BadRequest,
                    '59001': errors.ExchangeError,
                    '59002': errors.ExchangeError,
                    // contract errors
                    '40001': errors.ExchangeError,
                    '40002': errors.ExchangeError,
                    '40003': errors.ExchangeError,
                    '40004': errors.ExchangeError,
                    '40005': errors.ExchangeError,
                    '40006': errors.PermissionDenied,
                    '40007': errors.BadRequest,
                    '40008': errors.InvalidNonce,
                    '40009': errors.BadRequest,
                    '40010': errors.BadRequest,
                    '40011': errors.BadRequest,
                    '40012': errors.ExchangeError,
                    '40013': errors.ExchangeError,
                    '40014': errors.BadSymbol,
                    '40015': errors.BadSymbol,
                    '40016': errors.InvalidOrder,
                    '40017': errors.InvalidOrder,
                    '40018': errors.InvalidOrder,
                    '40019': errors.ExchangeError,
                    '40020': errors.InvalidOrder,
                    '40021': errors.ExchangeError,
                    '40022': errors.ExchangeError,
                    '40023': errors.ExchangeError,
                    '40024': errors.ExchangeError,
                    '40025': errors.ExchangeError,
                    '40026': errors.ExchangeError,
                    '40027': errors.InsufficientFunds,
                    '40028': errors.PermissionDenied,
                    '40029': errors.InvalidOrder,
                    '40030': errors.InvalidOrder,
                    '40031': errors.InvalidOrder,
                    '40032': errors.InvalidOrder,
                    '40033': errors.InvalidOrder,
                    '40034': errors.BadSymbol,
                    '53002': errors.PermissionDenied,
                    '53003': errors.PermissionDenied,
                    '53005': errors.PermissionDenied,
                    '53006': errors.PermissionDenied,
                    '53007': errors.PermissionDenied,
                    '53008': errors.PermissionDenied,
                    '53009': errors.PermissionDenied,
                    '53010': errors.PermissionDenied, // 403 This account is restricted from borrowing
                },
                'broad': {},
            },
            'commonCurrencies': {
                '$GM': 'GOLDMINER',
                '$HERO': 'Step Hero',
                '$PAC': 'PAC',
                'BP': 'BEYOND',
                'GDT': 'Gorilla Diamond',
                'GLD': 'Goldario',
                'MVP': 'MVP Coin',
                'TRU': 'Truebit', // conflict with TrueFi
            },
            'options': {
                'defaultNetwork': 'ERC20',
                'defaultNetworks': {
                    'USDT': 'ERC20',
                },
                'networks': {
                    'ERC20': 'ERC20',
                    'BTC': 'BTC',
                    'TRC20': 'TRC20',
                    // todo: should be TRX after unification
                    // 'TRC20': [ 'TRC20', 'trc20', 'TRON' ], // todo: after unification i.e. TRON is returned from fetchDepositAddress
                    // 'ERC20': [ 'ERC20', 'ERC-20', 'ERC20 ' ], // todo: after unification
                    'OMNI': 'OMNI',
                    'XLM': 'XLM',
                    'EOS': 'EOS',
                    'NEO': 'NEO',
                    'BTM': 'BTM',
                    'BCH': 'BCH',
                    'LTC': 'LTC',
                    'BSV': 'BSV',
                    'XRP': 'XRP',
                    // 'VECHAIN': [ 'VET', 'Vechain' ], // todo: after unification
                    'PLEX': 'PLEX',
                    'XCH': 'XCH',
                    // 'AVALANCHE_C': [ 'AVAX', 'AVAX-C' ], // todo: after unification
                    'NEAR': 'NEAR',
                    'FIO': 'FIO',
                    'SCRT': 'SCRT',
                    'IOTX': 'IOTX',
                    'SOL': 'SOL',
                    'ALGO': 'ALGO',
                    'ATOM': 'ATOM',
                    'DOT': 'DOT',
                    'ADA': 'ADA',
                    'DOGE': 'DOGE',
                    'XYM': 'XYM',
                    'GLMR': 'GLMR',
                    'MOVR': 'MOVR',
                    'ZIL': 'ZIL',
                    'INJ': 'INJ',
                    'KSM': 'KSM',
                    'ZEC': 'ZEC',
                    'NAS': 'NAS',
                    // 'POLYGON': [ 'MATIC', 'Polygon', 'POLYGON' ], // todo: after unification
                    'HRC20': 'HECO',
                    'XDC': 'XDC',
                    'ONE': 'ONE',
                    'LAT': 'LAT',
                    'CSPR': 'Casper',
                    'ICP': 'Computer',
                    'XTZ': 'XTZ',
                    'MINA': 'MINA',
                    // 'BEP20': [ 'BEP20', 'BSC_BNB', 'bep20' ], // todo: after unification
                    'THETA': 'THETA',
                    'AKT': 'AKT',
                    'AR': 'AR',
                    'CELO': 'CELO',
                    'FIL': 'FIL',
                    'NULS': 'NULS',
                    'ETC': 'ETC',
                    'DASH': 'DASH',
                    'DGB': 'DGB',
                    'BEP2': 'BEP2',
                    'GRIN': 'GRIN',
                    'WAVES': 'WAVES',
                    'ABBC': 'ABBC',
                    'ACA': 'ACA',
                    'QTUM': 'QTUM',
                    'PAC': 'PAC',
                    // 'TERRACLASSIC': 'LUNC', // TBD
                    // 'TERRA': 'Terra', // TBD
                    // 'HEDERA': [ 'HBAR', 'Hedera', 'Hedera Mainnet' ], // todo: after unification
                    'TLOS': 'TLOS',
                    'KARDIA': 'KardiaChain',
                    'FUSE': 'FUSE',
                    'TRC10': 'TRC10',
                    'FIRO': 'FIRO',
                    'FTM': 'Fantom',
                    // 'KLAYTN': [ 'klaytn', 'KLAY', 'Klaytn' ], // todo: after unification
                    // 'ELROND': [ 'EGLD', 'Elrond eGold', 'MultiversX' ], // todo: after unification
                    'EVER': 'EVER',
                    'KAVA': 'KAVA',
                    'HYDRA': 'HYDRA',
                    'PLCU': 'PLCU',
                    'BRISE': 'BRISE',
                    // 'CRC20': [ 'CRO', 'CRO_Chain' ], // todo: after unification
                    // 'CONFLUX': [ 'CFX eSpace', 'CFX' ], // todo: after unification
                    'OPTIMISM': 'OPTIMISM',
                    'REEF': 'REEF',
                    'SYS': 'SYS',
                    'VITE': 'VITE',
                    'STX': 'STX',
                    'SXP': 'SXP',
                    'BITCI': 'BITCI',
                    // 'ARBITRUM': [ 'ARBI', 'Arbitrum' ], // todo: after unification
                    'XRD': 'XRD',
                    'ASTR': 'ASTAR',
                    'ZEN': 'HORIZEN',
                    'LTO': 'LTO',
                    'ETHW': 'ETHW',
                    'ETHF': 'ETHF',
                    'IOST': 'IOST',
                    // 'CHILIZ': [ 'CHZ', 'CHILIZ' ], // todo: after unification
                    'APT': 'APT',
                    // 'FLOW': [ 'FLOW', 'Flow' ], // todo: after unification
                    'ONT': 'ONT',
                    'EVMOS': 'EVMOS',
                    'XMR': 'XMR',
                    'OASYS': 'OAS',
                    'OSMO': 'OSMO',
                    'OMAX': 'OMAX Chain',
                    'DESO': 'DESO',
                    'BFIC': 'BFIC',
                    'OHO': 'OHO',
                    'CS': 'CS',
                    'CHEQ': 'CHEQ',
                    'NODL': 'NODL',
                    'NEM': 'XEM',
                    'FRA': 'FRA',
                    'ERGO': 'ERG',
                    // todo: below will be uncommented after unification
                    // 'BITCOINHD': 'BHD',
                    // 'CRUST': 'CRU',
                    // 'MINTME': 'MINTME',
                    // 'ZENITH': 'ZENITH',
                    // 'ZENIQ': 'ZENIQ', // "ZEN-20" is different
                    // 'BITCOINVAULT': 'BTCV',
                    // 'MOBILECOIN': 'MBX',
                    // 'PINETWORK': 'PI',
                    // 'PI': 'PI',
                    // 'REBUS': 'REBUS',
                    // 'XODEX': 'XODEX',
                    // 'ULTRONGLOW': 'UTG'
                    // 'QIBLOCKCHAIN': 'QIE',
                    // 'XIDEN': 'XDEN',
                    // 'PHAETON': 'PHAE',
                    // 'REDLIGHT': 'REDLC',
                    // 'VERITISE': 'VTS',
                    // 'VERIBLOCK': 'VBK',
                    // 'RAMESTTA': 'RAMA',
                    // 'BITICA': 'BDCC',
                    // 'CROWNSOVEREIGN': 'CSOV',
                    // 'DRAC': 'DRC20',
                    // 'QCHAIN': 'QDT',
                    // 'KINGARU': 'KRU',
                    // 'PROOFOFMEMES': 'POM',
                    // 'CUBE': 'CUBE',
                    // 'CADUCEUS': 'CMP',
                    // 'VEIL': 'VEIL',
                    // 'ENERGYWEB': 'EWT',
                    // 'CYPHERIUM': 'CPH',
                    // 'LBRY': 'LBC',
                    // 'ETHERCOIN': 'ETE',
                    // undetermined chains:
                    // LEX (for LexThum), TAYCAN (for TRICE), SFL (probably TAYCAN), OMNIA (for APEX), NAC (for NAC), KAG (Kinesis), CEM (crypto emergency), XVM (for Venidium), NEVM (for NEVM), IGT20 (for IGNITE), FILM (FILMCredits), CC (CloudCoin), MERGE (MERGE), LTNM (Bitcoin latinum), PLUGCN ( PlugChain), DINGO (dingo), LED (LEDGIS), AVAT (AVAT), VSOL (Vsolidus), EPIC (EPIC cash), NFC (netflowcoin), mrx (Metrix Coin), Idena (idena network), PKT (PKT Cash), BondDex (BondDex), XBN (XBN), KALAM (Kalamint), REV (RChain), KRC20 (MyDeFiPet), ARC20 (Hurricane Token), GMD (Coop network), BERS (Berith), ZEBI (Zebi), BRC (Baer Chain), DAPS (DAPS Coin), APL (Gold Secured Currency), NDAU (NDAU), WICC (WICC), UPG (Unipay God), TSL (TreasureSL), MXW (Maxonrow), CLC (Cifculation), SMH (SMH Coin), XIN (CPCoin), RDD (ReddCoin), OK (Okcash), KAR (KAR), CCX (ConcealNetwork),
                },
                'defaultType': 'spot',
                'fetchBalance': {
                    'type': 'spot', // 'spot', 'swap', 'account'
                },
                'accountsByType': {
                    'spot': 'spot',
                    'swap': 'swap',
                },
                'createMarketBuyOrderRequiresPrice': true,
                'brokerId': 'CCXTxBitmart000',
            },
        });
    }
    async fetchTime(params = {}) {
        /**
         * @method
         * @name bitmart#fetchTime
         * @description fetches the current integer timestamp in milliseconds from the exchange server
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {int} the current integer timestamp in milliseconds from the exchange server
         */
        const response = await this.publicGetSystemTime(params);
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"c4e5e5b7-fe9f-4191-89f7-53f6c5bf9030",
        //         "data":{
        //             "server_time":1599843709578
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        return this.safeInteger(data, 'server_time');
    }
    async fetchStatus(params = {}) {
        /**
         * @method
         * @name bitmart#fetchStatus
         * @description the latest known information on the availability of the exchange API
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [status structure]{@link https://docs.ccxt.com/#/?id=exchange-status-structure}
         */
        const options = this.safeValue(this.options, 'fetchStatus', {});
        const defaultType = this.safeString(this.options, 'defaultType');
        let type = this.safeString(options, 'type', defaultType);
        type = this.safeString(params, 'type', type);
        params = this.omit(params, 'type');
        const response = await this.publicGetSystemService(params);
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "1d3f28b0-763e-4f78-90c4-5e3ad19dc595",
        //         "data": {
        //           "service": [
        //             {
        //               "title": "Spot API Stop",
        //               "service_type": "spot",
        //               "status": 2,
        //               "start_time": 1648639069125,
        //               "end_time": 1648639069125
        //             },
        //             {
        //               "title": "Contract API Stop",
        //               "service_type": "contract",
        //               "status": 2,
        //               "start_time": 1648639069125,
        //               "end_time": 1648639069125
        //             }
        //           ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const services = this.safeValue(data, 'service', []);
        const servicesByType = this.indexBy(services, 'service_type');
        if (type === 'swap') {
            type = 'contract';
        }
        const service = this.safeValue(servicesByType, type);
        let status = undefined;
        let eta = undefined;
        if (service !== undefined) {
            const statusCode = this.safeInteger(service, 'status');
            if (statusCode === 2) {
                status = 'ok';
            }
            else {
                status = 'maintenance';
                eta = this.safeInteger(service, 'end_time');
            }
        }
        return {
            'status': status,
            'updated': undefined,
            'eta': eta,
            'url': undefined,
            'info': response,
        };
    }
    async fetchSpotMarkets(params = {}) {
        const response = await this.publicGetSpotV1SymbolsDetails(params);
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"a67c9146-086d-4d3f-9897-5636a9bb26e1",
        //         "data":{
        //             "symbols":[
        //               {
        //                  "symbol": "BTC_USDT",
        //                  "symbol_id": 53,
        //                  "base_currency": "BTC",
        //                  "quote_currency": "USDT",
        //                  "base_min_size": "0.000010000000000000000000000000",
        //                  "base_max_size": "100000000.000000000000000000000000000000",
        //                  "price_min_precision": -1,
        //                  "price_max_precision": 2,
        //                  "quote_increment": "0.00001", // Api docs says "The minimum order quantity is also the minimum order quantity increment", however I think they mistakenly use the term 'order quantity'
        //                  "expiration": "NA",
        //                  "min_buy_amount": "5.000000000000000000000000000000",
        //                  "min_sell_amount": "5.000000000000000000000000000000",
        //                  "trade_status": "trading"
        //               },
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const symbols = this.safeValue(data, 'symbols', []);
        const result = [];
        for (let i = 0; i < symbols.length; i++) {
            const market = symbols[i];
            const id = this.safeString(market, 'symbol');
            const numericId = this.safeInteger(market, 'symbol_id');
            const baseId = this.safeString(market, 'base_currency');
            const quoteId = this.safeString(market, 'quote_currency');
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            const symbol = base + '/' + quote;
            const minBuyCost = this.safeString(market, 'min_buy_amount');
            const minSellCost = this.safeString(market, 'min_sell_amount');
            const minCost = Precise["default"].stringMax(minBuyCost, minSellCost);
            const baseMinSize = this.safeNumber(market, 'base_min_size');
            result.push({
                'id': id,
                'numericId': numericId,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'active': true,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': baseMinSize,
                    'price': this.parseNumber(this.parsePrecision(this.safeString(market, 'price_max_precision'))),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': baseMinSize,
                        'max': this.safeNumber(market, 'base_max_size'),
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': this.parseNumber(minCost),
                        'max': undefined,
                    },
                },
                'created': undefined,
                'info': market,
            });
        }
        return result;
    }
    async fetchContractMarkets(params = {}) {
        const response = await this.publicGetContractPublicDetails(params);
        //
        //     {
        //       "code": 1000,
        //       "message": "Ok",
        //       "trace": "9b92a999-9463-4c96-91a4-93ad1cad0d72",
        //       "data": {
        //       "symbols": [{
        //             "symbol": "BTCUSDT",
        //             "product_type": 1,
        //             "open_timestamp": 1594080000,
        //             "expire_timestamp": 0,
        //             "settle_timestamp": 0,
        //             "base_currency": "BTC",
        //             "quote_currency": "USDT",
        //             "last_price": "23920",
        //             "volume_24h": "18969368",
        //             "turnover_24h": "458933659.7858",
        //             "index_price": "23945.25191635",
        //             "index_name": "BTCUSDT",
        //             "contract_size": "0.001",
        //             "min_leverage": "1",
        //             "max_leverage": "100",
        //             "price_precision": "0.1",
        //             "vol_precision": "1",
        //             "max_volume": "500000",
        //             "min_volume": "1"
        //           },
        //           ...
        //         ]
        //       }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const symbols = this.safeValue(data, 'symbols', []);
        const result = [];
        for (let i = 0; i < symbols.length; i++) {
            const market = symbols[i];
            const id = this.safeString(market, 'symbol');
            const baseId = this.safeString(market, 'base_currency');
            const quoteId = this.safeString(market, 'quote_currency');
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            const settleId = 'USDT'; // this is bitmart's ID for usdt
            const settle = this.safeCurrencyCode(settleId);
            const symbol = base + '/' + quote + ':' + settle;
            const productType = this.safeInteger(market, 'product_type');
            const isSwap = (productType === 1);
            const isFutures = (productType === 2);
            let expiry = this.safeInteger(market, 'expire_timestamp');
            if (!isFutures && (expiry === 0)) {
                expiry = undefined;
            }
            result.push({
                'id': id,
                'numericId': undefined,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': settle,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': settleId,
                'type': isSwap ? 'swap' : 'future',
                'spot': false,
                'margin': false,
                'swap': isSwap,
                'future': isFutures,
                'option': false,
                'active': true,
                'contract': true,
                'linear': true,
                'inverse': false,
                'contractSize': this.safeNumber(market, 'contract_size'),
                'expiry': expiry,
                'expiryDatetime': this.iso8601(expiry),
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.safeNumber(market, 'vol_precision'),
                    'price': this.safeNumber(market, 'price_precision'),
                },
                'limits': {
                    'leverage': {
                        'min': this.safeNumber(market, 'min_leverage'),
                        'max': this.safeNumber(market, 'max_leverage'),
                    },
                    'amount': {
                        'min': this.safeNumber(market, 'min_volume'),
                        'max': this.safeNumber(market, 'max_volume'),
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'created': this.safeInteger(market, 'open_timestamp'),
                'info': market,
            });
        }
        return result;
    }
    async fetchMarkets(params = {}) {
        /**
         * @method
         * @name bitmart#fetchMarkets
         * @description retrieves data on all markets for bitmart
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} an array of objects representing market data
         */
        const spot = await this.fetchSpotMarkets(params);
        const contract = await this.fetchContractMarkets(params);
        return this.arrayConcat(spot, contract);
    }
    async fetchCurrencies(params = {}) {
        /**
         * @method
         * @name bitmart#fetchCurrencies
         * @description fetches all available currencies on an exchange
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an associative dictionary of currencies
         */
        const response = await this.publicGetSpotV1Currencies(params);
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"8c768b3c-025f-413f-bec5-6d6411d46883",
        //         "data":{
        //             "currencies":[
        //                 {"currency":"MATIC","name":"Matic Network","withdraw_enabled":true,"deposit_enabled":true},
        //                 {"currency":"KTN","name":"Kasoutuuka News","withdraw_enabled":true,"deposit_enabled":false},
        //                 {"currency":"BRT","name":"Berith","withdraw_enabled":true,"deposit_enabled":true},
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const currencies = this.safeValue(data, 'currencies', []);
        const result = {};
        for (let i = 0; i < currencies.length; i++) {
            const currency = currencies[i];
            const id = this.safeString(currency, 'id');
            const code = this.safeCurrencyCode(id);
            const name = this.safeString(currency, 'name');
            const withdrawEnabled = this.safeValue(currency, 'withdraw_enabled');
            const depositEnabled = this.safeValue(currency, 'deposit_enabled');
            const active = withdrawEnabled && depositEnabled;
            result[code] = {
                'id': id,
                'code': code,
                'name': name,
                'info': currency,
                'active': active,
                'deposit': depositEnabled,
                'withdraw': withdrawEnabled,
                'fee': undefined,
                'precision': undefined,
                'limits': {
                    'amount': { 'min': undefined, 'max': undefined },
                    'withdraw': { 'min': undefined, 'max': undefined },
                },
            };
        }
        return result;
    }
    async fetchTransactionFee(code, params = {}) {
        /**
         * @method
         * @name bitmart#fetchTransactionFee
         * @deprecated
         * @description please use fetchDepositWithdrawFee instead
         * @param {string} code unified currency code
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [fee structure]{@link https://docs.ccxt.com/#/?id=fee-structure}
         */
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        const response = await this.privateGetAccountV1WithdrawCharge(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": "1000",
        //         "trace": "3ecc0adf-91bd-4de7-aca1-886c1122f54f",
        //         "data": {
        //             "today_available_withdraw_BTC": "100.0000",
        //             "min_withdraw": "0.005",
        //             "withdraw_precision": "8",
        //             "withdraw_fee": "0.000500000000000000000000000000"
        //         }
        //     }
        //
        const data = response['data'];
        const withdrawFees = {};
        withdrawFees[code] = this.safeNumber(data, 'withdraw_fee');
        return {
            'info': response,
            'withdraw': withdrawFees,
            'deposit': {},
        };
    }
    parseDepositWithdrawFee(fee, currency = undefined) {
        //
        //    {
        //        "today_available_withdraw_BTC": "100.0000",
        //        "min_withdraw": "0.005",
        //        "withdraw_precision": "8",
        //        "withdraw_fee": "0.000500000000000000000000000000"
        //    }
        //
        return {
            'info': fee,
            'withdraw': {
                'fee': this.safeNumber(fee, 'withdraw_fee'),
                'percentage': undefined,
            },
            'deposit': {
                'fee': undefined,
                'percentage': undefined,
            },
            'networks': {},
        };
    }
    async fetchDepositWithdrawFee(code, params = {}) {
        /**
         * @method
         * @name bitmart#fetchDepositWithdrawFee
         * @description fetch the fee for deposits and withdrawals
         * @param {string} code unified currency code
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [fee structure]{@link https://docs.ccxt.com/#/?id=fee-structure}
         */
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        const response = await this.privateGetAccountV1WithdrawCharge(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": "1000",
        //         "trace": "3ecc0adf-91bd-4de7-aca1-886c1122f54f",
        //         "data": {
        //             "today_available_withdraw_BTC": "100.0000",
        //             "min_withdraw": "0.005",
        //             "withdraw_precision": "8",
        //             "withdraw_fee": "0.000500000000000000000000000000"
        //         }
        //     }
        //
        const data = response['data'];
        return this.parseDepositWithdrawFee(data);
    }
    parseTicker(ticker, market = undefined) {
        //
        // spot
        //
        //      {
        //          "symbol": "SOLAR_USDT",
        //          "last_price": "0.020342",
        //          "quote_volume_24h": "56817.811802",
        //          "base_volume_24h": "2172060",
        //          "high_24h": "0.256000",
        //          "low_24h": "0.016980",
        //          "open_24h": "0.022309",
        //          "close_24h": "0.020342",
        //          "best_ask": "0.020389",
        //          "best_ask_size": "339.000000000000000000000000000000",
        //          "best_bid": "0.020342",
        //          "best_bid_size": "3369.000000000000000000000000000000",
        //          "fluctuation": "-0.0882",
        //          "url": "https://www.bitmart.com/trade?symbol=SOLAR_USDT",
        //          "timestamp": 1667403439367
        //      }
        //
        // swap
        //
        //      {
        //          "contract_symbol":"DOGEUSDT",
        //          "last_price":"0.130340",
        //          "index_price":"0.13048245",
        //          "last_funding_rate":"0.00002287",
        //          "price_change_percent_24h":"-2.074",
        //          "volume_24h":"113705028.59482228",
        //          "url":"https://futures.bitmart.com/en?symbol=DOGEUSDT",
        //          "high_price":"0.134520",
        //          "low_price":"0.128570",
        //          "legal_coin_price":"0.1302699"
        //      }
        //
        const timestamp = this.safeInteger(ticker, 'timestamp');
        const marketId = this.safeString2(ticker, 'symbol', 'contract_symbol');
        market = this.safeMarket(marketId, market);
        const symbol = market['symbol'];
        const last = this.safeString2(ticker, 'close_24h', 'last_price');
        let percentage = this.safeString(ticker, 'price_change_percent_24h');
        if (percentage === undefined) {
            const percentageRaw = this.safeString(ticker, 'fluctuation');
            if ((percentageRaw !== undefined) && (percentageRaw !== '0')) { // a few tickers show strictly '0' in fluctuation field
                const direction = percentageRaw[0];
                percentage = direction + Precise["default"].stringMul(percentageRaw.replace(direction, ''), '100');
            }
            else if (percentageRaw === '0') {
                percentage = '0';
            }
        }
        const baseVolume = this.safeString(ticker, 'base_volume_24h');
        let quoteVolume = this.safeString(ticker, 'quote_volume_24h');
        quoteVolume = this.safeString(ticker, 'volume_24h', quoteVolume);
        const average = this.safeString2(ticker, 'avg_price', 'index_price');
        const high = this.safeString2(ticker, 'high_24h', 'high_price');
        const low = this.safeString2(ticker, 'low_24h', 'low_price');
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': high,
            'low': low,
            'bid': this.safeString(ticker, 'best_bid'),
            'bidVolume': this.safeString(ticker, 'best_bid_size'),
            'ask': this.safeString(ticker, 'best_ask'),
            'askVolume': this.safeString(ticker, 'best_ask_size'),
            'vwap': undefined,
            'open': this.safeString(ticker, 'open_24h'),
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': percentage,
            'average': average,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        }, market);
    }
    async fetchTicker(symbol, params = {}) {
        /**
         * @method
         * @name bitmart#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {};
        let response = undefined;
        if (market['swap']) {
            request['contract_symbol'] = market['id'];
            response = await this.publicGetContractV1Tickers(this.extend(request, params));
        }
        else if (market['spot']) {
            request['symbol'] = market['id'];
            response = await this.publicGetSpotV1Ticker(this.extend(request, params));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchTicker() does not support ' + market['type'] + ' markets, only spot and swap markets are accepted');
        }
        //
        // spot
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"6aa5b923-2f57-46e3-876d-feca190e0b82",
        //         "data":{
        //             "tickers":[
        //                 {
        //                     "symbol":"ETH_BTC",
        //                     "last_price":"0.036037",
        //                     "quote_volume_24h":"4380.6660000000",
        //                     "base_volume_24h":"159.3582006712",
        //                     "high_24h":"0.036972",
        //                     "low_24h":"0.035524",
        //                     "open_24h":"0.036561",
        //                     "close_24h":"0.036037",
        //                     "best_ask":"0.036077",
        //                     "best_ask_size":"9.9500",
        //                     "best_bid":"0.035983",
        //                     "best_bid_size":"4.2792",
        //                     "fluctuation":"-0.0143",
        //                     "url":"https://www.bitmart.com/trade?symbol=ETH_BTC"
        //                 }
        //             ]
        //         }
        //     }
        //
        // swap
        //
        //      {
        //          "message":"OK",
        //          "code":1000,
        //          "trace":"4a0ebceb-d3f7-45a3-8feb-f61e230e24cd",
        //          "data":{
        //              "tickers":[
        //                  {
        //                      "contract_symbol":"DOGEUSDT",
        //                      "last_price":"0.130180",
        //                      "index_price":"0.13028635",
        //                      "last_funding_rate":"0.00002025",
        //                      "price_change_percent_24h":"-2.326",
        //                      "volume_24h":"116789313.01797258",
        //                      "url":"https://futures.bitmart.com/en?symbol=DOGEUSDT",
        //                      "high_price":"0.134520",
        //                      "low_price":"0.128570",
        //                      "legal_coin_price":"0.13017401"
        //                  }
        //              ]
        //          }
        //      }
        //
        const data = this.safeValue(response, 'data', {});
        const tickers = this.safeValue(data, 'tickers', []);
        // fails in naming for contract tickers 'contract_symbol'
        let tickersById = undefined;
        if (market['spot']) {
            tickersById = this.indexBy(tickers, 'symbol');
        }
        else if (market['swap']) {
            tickersById = this.indexBy(tickers, 'contract_symbol');
        }
        const ticker = this.safeValue(tickersById, market['id']);
        return this.parseTicker(ticker, market);
    }
    async fetchTickers(symbols = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchTickers
         * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
         * @see https://developer-pro.bitmart.com/en/spot/#get-ticker-of-all-pairs-v2
         * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        let type = undefined;
        let market = undefined;
        if (symbols !== undefined) {
            const symbol = this.safeValue(symbols, 0);
            market = this.market(symbol);
        }
        [type, params] = this.handleMarketTypeAndParams('fetchTickers', market, params);
        let response = undefined;
        if (type === 'spot') {
            response = await this.publicGetSpotV2Ticker(params);
        }
        else if (type === 'swap') {
            response = await this.publicGetContractV1Tickers(params);
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchTickers() does not support ' + type + ' markets, only spot and swap markets are accepted');
        }
        const data = this.safeValue(response, 'data', {});
        const tickers = this.safeValue(data, 'tickers', []);
        const result = {};
        for (let i = 0; i < tickers.length; i++) {
            const ticker = this.parseTicker(tickers[i]);
            const symbol = ticker['symbol'];
            result[symbol] = ticker;
        }
        return this.filterByArrayTickers(result, 'symbol', symbols);
    }
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @see https://developer-pro.bitmart.com/en/spot/#get-depth-v3
         * @see https://developer-pro.bitmart.com/en/futures/#get-market-depth
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int} [limit] the maximum amount of order book entries to return
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        let response = undefined;
        if (market['spot']) {
            if (limit !== undefined) {
                request['limit'] = limit; // default 35, max 50
            }
            response = await this.publicGetSpotQuotationV3Books(this.extend(request, params));
        }
        else if (market['swap']) {
            response = await this.publicGetContractPublicDepth(this.extend(request, params));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchOrderBook() does not support ' + market['type'] + ' markets, only spot and swap markets are accepted');
        }
        //
        // spot
        //
        //     {
        //         "code": 1000,
        //         "message": "success",
        //         "data": {
        //             "ts": "1695264191808",
        //             "symbol": "BTC_USDT",
        //             "asks": [
        //                 ["26942.57","0.06492"],
        //                 ["26942.73","0.05447"],
        //                 ["26943.00","0.07154"]
        //             ],
        //             "bids": [
        //                 ["26942.45","0.00074"],
        //                 ["26941.53","0.00371"],
        //                 ["26940.94","0.08992"]
        //             ]
        //         },
        //         "trace": "430a7f69581d4258a8e4b424dfb10782.73.16952341919017619"
        //     }
        //
        // swap
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": {
        //             "asks": [
        //                 ["26938.3","3499","3499"],
        //                 ["26938.5","14702","18201"],
        //                 ["26938.6","20457","38658"]
        //             ],
        //             "bids": [
        //                 ["26938.2","20","20"],
        //                 ["26937.9","1913","1933"],
        //                 ["26937.8","2588","4521"]
        //             ],
        //             "timestamp": 1695264383999,
        //             "symbol": "BTCUSDT"
        //         },
        //         "trace": "4cad855074664097ac6ba5258c47305d.72.16952643834721135"
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const timestamp = this.safeInteger2(data, 'ts', 'timestamp');
        return this.parseOrderBook(data, market['symbol'], timestamp);
    }
    parseTrade(trade, market = undefined) {
        //
        // public fetchTrades spot ( amount = count * price )
        //
        //    {
        //        "amount": "818.94",
        //        "order_time": "1637601839035",    // ETH/USDT
        //        "price": "4221.99",
        //        "count": "0.19397",
        //        "type": "buy"
        //    }
        //
        // spot: fetchMyTrades
        //
        //    {
        //        "tradeId":"182342999769370687",
        //        "orderId":"183270218784142990",
        //        "clientOrderId":"183270218784142990",
        //        "symbol":"ADA_USDT",
        //        "side":"buy",
        //        "orderMode":"spot",
        //        "type":"market",
        //        "price":"0.245948",
        //        "size":"20.71",
        //        "notional":"5.09358308",
        //        "fee":"0.00509358",
        //        "feeCoinName":"USDT",
        //        "tradeRole":"taker",
        //        "createTime":1695658457836,
        //    }
        //
        // swap: fetchMyTrades
        //
        //    {
        //        "order_id": "230930336848609",
        //        "trade_id": "6212604014",
        //        "symbol": "BTCUSDT",
        //        "side": 3,
        //        "price": "26910.4",
        //        "vol": "1",
        //        "exec_type": "Taker",
        //        "profit": false,
        //        "create_time": 1695961596692,
        //        "realised_profit": "-0.0003",
        //        "paid_fees": "0.01614624"
        //    }
        //
        // ws swap
        //
        //    {
        //        'fee': '-0.000044502',
        //        'feeCcy': 'USDT',
        //        'fillPrice': '74.17',
        //        'fillQty': '1',
        //        'lastTradeID': 6802340762
        //    }
        //
        const timestamp = this.safeIntegerN(trade, ['order_time', 'createTime', 'create_time']);
        const isPublicTrade = ('order_time' in trade);
        let amount = undefined;
        let cost = undefined;
        let type = undefined;
        let side = undefined;
        if (isPublicTrade) {
            amount = this.safeString(trade, 'count');
            cost = this.safeString(trade, 'amount');
            side = this.safeString(trade, 'type');
        }
        else {
            amount = this.safeStringN(trade, ['size', 'vol', 'fillQty']);
            cost = this.safeString(trade, 'notional');
            type = this.safeString(trade, 'type');
            side = this.parseOrderSide(this.safeString(trade, 'side'));
        }
        const marketId = this.safeString(trade, 'symbol');
        market = this.safeMarket(marketId, market);
        const feeCostString = this.safeString2(trade, 'fee', 'paid_fees');
        let fee = undefined;
        if (feeCostString !== undefined) {
            const feeCurrencyId = this.safeString(trade, 'feeCoinName');
            let feeCurrencyCode = this.safeCurrencyCode(feeCurrencyId);
            if (feeCurrencyCode === undefined) {
                feeCurrencyCode = (side === 'buy') ? market['base'] : market['quote'];
            }
            fee = {
                'cost': feeCostString,
                'currency': feeCurrencyCode,
            };
        }
        return this.safeTrade({
            'info': trade,
            'id': this.safeStringN(trade, ['tradeId', 'trade_id', 'lastTradeID']),
            'order': this.safeString2(trade, 'orderId', 'order_id'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': type,
            'side': side,
            'price': this.safeString2(trade, 'price', 'fillPrice'),
            'amount': amount,
            'cost': cost,
            'takerOrMaker': this.safeStringLower2(trade, 'tradeRole', 'exec_type'),
            'fee': fee,
        }, market);
    }
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['spot']) {
            throw new errors.NotSupported(this.id + ' fetchTrades() does not support ' + market['type'] + ' orders, only spot orders are accepted');
        }
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetSpotV1SymbolsTrades(this.extend(request, params));
        //
        // spot
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"222d74c0-8f6d-49d9-8e1b-98118c50eeba",
        //         "data":{
        //             "trades":[
        //                 {
        //                     "amount":"0.005703",
        //                     "order_time":1599652045394,
        //                     "price":"0.034029",
        //                     "count":"0.1676",
        //                     "type":"sell"
        //                 },
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const trades = this.safeValue(data, 'trades', []);
        return this.parseTrades(trades, market, since, limit);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        // spot
        //    [
        //        "1699512060", // timestamp
        //        "36746.49", // open
        //        "36758.71", // high
        //        "36736.13", // low
        //        "36755.99", // close
        //        "2.83965", // base volume
        //        "104353.57" // quote volume
        //    ]
        //
        // swap
        //    {
        //        "low_price": "20090.3",
        //        "high_price": "20095.5",
        //        "open_price": "20092.6",
        //        "close_price": "20091.4",
        //        "volume": "8748",
        //        "timestamp": 1665002281
        //    }
        //
        // ws
        //    [
        //        1631056350, // timestamp
        //        "46532.83", // open
        //        "46555.71", // high
        //        "46511.41", // low
        //        "46555.71", // close
        //        "0.25", // volume
        //    ]
        //
        // ws swap
        //    {
        //        "symbol":"BTCUSDT",
        //        "o":"146.24",
        //        "h":"146.24",
        //        "l":"146.24",
        //        "c":"146.24",
        //        "v":"146"
        //    }
        //
        if (Array.isArray(ohlcv)) {
            return [
                this.safeTimestamp(ohlcv, 0),
                this.safeNumber(ohlcv, 1),
                this.safeNumber(ohlcv, 2),
                this.safeNumber(ohlcv, 3),
                this.safeNumber(ohlcv, 4),
                this.safeNumber(ohlcv, 5),
            ];
        }
        else {
            return [
                this.safeTimestamp2(ohlcv, 'timestamp', 'ts'),
                this.safeNumber2(ohlcv, 'open_price', 'o'),
                this.safeNumber2(ohlcv, 'high_price', 'h'),
                this.safeNumber2(ohlcv, 'low_price', 'l'),
                this.safeNumber2(ohlcv, 'close_price', 'c'),
                this.safeNumber2(ohlcv, 'volume', 'v'),
            ];
        }
    }
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @see https://developer-pro.bitmart.com/en/spot/#get-history-k-line-v3
         * @see https://developer-pro.bitmart.com/en/futures/#get-k-line
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int} [since] timestamp in ms of the earliest candle to fetch
         * @param {int} [limit] the maximum amount of candles to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] timestamp of the latest candle in ms
         * @param {boolean} [params.paginate] *spot only* default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
         * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchOHLCV', 'paginate', false);
        if (paginate) {
            return await this.fetchPaginatedCallDeterministic('fetchOHLCV', symbol, since, limit, timeframe, params, 200);
        }
        const market = this.market(symbol);
        const duration = this.parseTimeframe(timeframe);
        const parsedTimeframe = this.safeInteger(this.timeframes, timeframe);
        let request = {
            'symbol': market['id'],
        };
        if (parsedTimeframe !== undefined) {
            request['step'] = parsedTimeframe;
        }
        else {
            request['step'] = timeframe;
        }
        if (market['spot']) {
            [request, params] = this.handleUntilOption('before', request, params, 0.001);
            if (limit !== undefined) {
                request['limit'] = limit;
            }
            if (since !== undefined) {
                request['after'] = this.parseToInt((since / 1000)) - 1;
            }
        }
        else {
            const maxLimit = 1200;
            if (limit === undefined) {
                limit = maxLimit;
            }
            limit = Math.min(maxLimit, limit);
            const now = this.parseToInt(this.milliseconds() / 1000);
            if (since === undefined) {
                const start = now - limit * duration;
                request['start_time'] = start;
                request['end_time'] = now;
            }
            else {
                const start = this.parseToInt((since / 1000)) - 1;
                const end = this.sum(start, limit * duration);
                request['start_time'] = start;
                request['end_time'] = Math.min(end, now);
            }
            [request, params] = this.handleUntilOption('end_time', request, params, 0.001);
        }
        let response = undefined;
        if (market['swap']) {
            response = await this.publicGetContractPublicKline(this.extend(request, params));
        }
        else {
            response = await this.publicGetSpotQuotationV3Klines(this.extend(request, params));
        }
        //
        // spot
        //
        //     {
        //         "code": 1000,
        //         "message": "success",
        //         "data": [
        //             ["1699512060","36746.49","36758.71","36736.13","36755.99","2.83965","104353.57"],
        //             ["1699512120","36756.00","36758.70","36737.14","36737.63","1.96070","72047.10"],
        //             ["1699512180","36737.63","36740.45","36737.62","36740.44","0.63194","23217.62"]
        //         ],
        //         "trace": "6591fc7b508845359d5fa442e3b3a4fb.72.16995122398750695"
        //     }
        //
        // swap
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": [
        //             {
        //                 "low_price": "20090.3",
        //                 "high_price": "20095.5",
        //                 "open_price": "20092.6",
        //                 "close_price": "20091.4",
        //                 "volume": "8748",
        //                 "timestamp": 1665002281
        //             },
        //             ...
        //         ],
        //         "trace": "96c989db-e0f5-46f5-bba6-60cfcbde699b"
        //     }
        //
        const ohlcv = this.safeValue(response, 'data', []);
        return this.parseOHLCVs(ohlcv, market, timeframe, since, limit);
    }
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchMyTrades
         * @see https://developer-pro.bitmart.com/en/spot/#account-trade-list-v4-signed
         * @see https://developer-pro.bitmart.com/en/futures/#get-order-trade-keyed
         * @description fetch all trades made by the user
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch trades for
         * @param {int} [limit] the maximum number of trades structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] the latest time in ms to fetch trades for
         * @param {boolean} [params.marginMode] *spot* whether to fetch trades for margin orders or spot orders, defaults to spot orders (only isolated margin orders are supported)
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        await this.loadMarkets();
        let market = undefined;
        const request = {};
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        let type = undefined;
        let response = undefined;
        [type, params] = this.handleMarketTypeAndParams('fetchMyTrades', market, params);
        const until = this.safeIntegerN(params, ['until', 'endTime', 'end_time']);
        params = this.omit(params, ['until']);
        if (type === 'spot') {
            let marginMode = undefined;
            [marginMode, params] = this.handleMarginModeAndParams('fetchMyTrades', params);
            if (marginMode === 'isolated') {
                request['orderMode'] = 'iso_margin';
            }
            const options = this.safeValue(this.options, 'fetchMyTrades', {});
            const defaultLimit = this.safeInteger(options, 'limit', 200);
            if (limit === undefined) {
                limit = defaultLimit;
            }
            request['limit'] = limit;
            if (since !== undefined) {
                request['startTime'] = since;
            }
            if (until !== undefined) {
                request['endTime'] = until;
            }
            response = await this.privatePostSpotV4QueryTrades(this.extend(request, params));
        }
        else if (type === 'swap') {
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' fetchMyTrades() requires a symbol argument');
            }
            if (since !== undefined) {
                request['start_time'] = since;
            }
            if (until !== undefined) {
                request['end_time'] = until;
            }
            response = await this.privateGetContractPrivateTrades(this.extend(request, params));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchMyTrades() does not support ' + type + ' orders, only spot and swap orders are accepted');
        }
        //
        // spot
        //
        //    {
        //        "code":1000,
        //        "message":"success",
        //        "data":[
        //           {
        //              "tradeId":"182342999769370687",
        //              "orderId":"183270218784142990",
        //              "clientOrderId":"183270218784142990",
        //              "symbol":"ADA_USDT",
        //              "side":"buy",
        //              "orderMode":"spot",
        //              "type":"market",
        //              "price":"0.245948",
        //              "size":"20.71",
        //              "notional":"5.09358308",
        //              "fee":"0.00509358",
        //              "feeCoinName":"USDT",
        //              "tradeRole":"taker",
        //              "createTime":1695658457836,
        //              "updateTime":1695658457836
        //           }
        //        ],
        //        "trace":"fbaee9e0e2f5442fba5b3262fc86b0ac.65.16956593456523085"
        //    }
        //
        // swap
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": [
        //             {
        //                 "order_id": "230930336848609",
        //                 "trade_id": "6212604014",
        //                 "symbol": "BTCUSDT",
        //                 "side": 3,
        //                 "price": "26910.4",
        //                 "vol": "1",
        //                 "exec_type": "Taker",
        //                 "profit": false,
        //                 "create_time": 1695961596692,
        //                 "realised_profit": "-0.0003",
        //                 "paid_fees": "0.01614624"
        //             },
        //         ],
        //         "trace": "4cad855074634097ac6ba5257c47305d.62.16959616054873723"
        //     }
        //
        const data = this.safeValue(response, 'data', []);
        return this.parseTrades(data, market, since, limit);
    }
    async fetchOrderTrades(id, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchOrderTrades
         * @see https://developer-pro.bitmart.com/en/spot/#order-trade-list-v4-signed
         * @description fetch all the trades made from a single order
         * @param {string} id order id
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch trades for
         * @param {int} [limit] the maximum number of trades to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        await this.loadMarkets();
        const request = {
            'orderId': id,
        };
        const response = await this.privatePostSpotV4QueryOrderTrades(this.extend(request, params));
        const data = this.safeValue(response, 'data', {});
        return this.parseTrades(data, undefined, since, limit);
    }
    customParseBalance(response, marketType) {
        const data = this.safeValue(response, 'data', {});
        let wallet = undefined;
        if (marketType === 'swap') {
            wallet = this.safeValue(response, 'data', []);
        }
        else if (marketType === 'margin') {
            wallet = this.safeValue(data, 'symbols', []);
        }
        else {
            wallet = this.safeValue(data, 'wallet', []);
        }
        const result = { 'info': response };
        if (marketType === 'margin') {
            for (let i = 0; i < wallet.length; i++) {
                const entry = wallet[i];
                const marketId = this.safeString(entry, 'symbol');
                const symbol = this.safeSymbol(marketId, undefined, '_');
                const base = this.safeValue(entry, 'base', {});
                const quote = this.safeValue(entry, 'quote', {});
                const baseCode = this.safeCurrencyCode(this.safeString(base, 'currency'));
                const quoteCode = this.safeCurrencyCode(this.safeString(quote, 'currency'));
                const subResult = {};
                subResult[baseCode] = this.parseBalanceHelper(base);
                subResult[quoteCode] = this.parseBalanceHelper(quote);
                result[symbol] = this.safeBalance(subResult);
            }
            return result;
        }
        else {
            for (let i = 0; i < wallet.length; i++) {
                const balance = wallet[i];
                let currencyId = this.safeString2(balance, 'id', 'currency');
                currencyId = this.safeString(balance, 'coin_code', currencyId);
                const code = this.safeCurrencyCode(currencyId);
                const account = this.account();
                account['free'] = this.safeString2(balance, 'available', 'available_balance');
                account['used'] = this.safeString2(balance, 'frozen', 'frozen_balance');
                result[code] = account;
            }
            return this.safeBalance(result);
        }
    }
    parseBalanceHelper(entry) {
        const account = this.account();
        account['used'] = this.safeString(entry, 'frozen');
        account['free'] = this.safeString(entry, 'available');
        account['total'] = this.safeString(entry, 'total_asset');
        const debt = this.safeString(entry, 'borrow_unpaid');
        const interest = this.safeString(entry, 'interest_unpaid');
        account['debt'] = Precise["default"].stringAdd(debt, interest);
        return account;
    }
    async fetchBalance(params = {}) {
        /**
         * @method
         * @name bitmart#fetchBalance
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @see https://developer-pro.bitmart.com/en/spot/#get-spot-wallet-balance
         * @see https://developer-pro.bitmart.com/en/futures/#get-contract-assets-detail
         * @see https://developer-pro.bitmart.com/en/spot/#get-account-balance
         * @see https://developer-pro.bitmart.com/en/spot/#get-margin-account-details-isolated
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
         */
        await this.loadMarkets();
        let marketType = undefined;
        [marketType, params] = this.handleMarketTypeAndParams('fetchBalance', undefined, params);
        const marginMode = this.safeString(params, 'marginMode');
        const isMargin = this.safeValue(params, 'margin', false);
        params = this.omit(params, ['margin', 'marginMode']);
        if (marginMode !== undefined || isMargin) {
            marketType = 'margin';
        }
        let response = undefined;
        if (marketType === 'spot') {
            response = await this.privateGetSpotV1Wallet(params);
        }
        else if (marketType === 'swap') {
            response = await this.privateGetContractPrivateAssetsDetail(params);
        }
        else if (marketType === 'account') {
            response = await this.privateGetAccountV1Wallet(params);
        }
        else if (marketType === 'margin') {
            response = await this.privateGetSpotV1MarginIsolatedAccount(params);
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchBalance() does not support ' + marketType + ' markets, only spot, swap and account and margin markets are accepted');
        }
        //
        // spot
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"39069916-72f9-44c7-acde-2ad5afd21cad",
        //         "data":{
        //             "wallet":[
        //                 {"id":"BTC","name":"Bitcoin","available":"0.00000062","frozen":"0.00000000"},
        //                 {"id":"ETH","name":"Ethereum","available":"0.00002277","frozen":"0.00000000"},
        //                 {"id":"BMX","name":"BitMart Token","available":"0.00000000","frozen":"0.00000000"}
        //             ]
        //         }
        //     }
        //
        // account
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"5c3b7fc7-93b2-49ef-bb59-7fdc56915b59",
        //         "data":{
        //             "wallet":[
        //                 {"currency":"BTC","name":"Bitcoin","available":"0.00000062","frozen":"0.00000000"},
        //                 {"currency":"ETH","name":"Ethereum","available":"0.00002277","frozen":"0.00000000"}
        //             ]
        //         }
        //     }
        //
        // swap
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": [
        //             {
        //                 "currency": "USDT",
        //                 "available_balance": "0",
        //                 "frozen_balance": "0",
        //                 "unrealized": "0",
        //                 "equity": "0",
        //                 "position_deposit": "0"
        //             },
        //             ...
        //         ],
        //         "trace": "f9da3a39-cf45-42e7-914d-294f565dfc33"
        //     }
        //
        // margin
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "61dd6ab265c04064b72d8bc9b205f741.71.16701055600915302",
        //         "data": {
        //             "symbols": [
        //                 {
        //                     "symbol": "BTC_USDT",
        //                     "risk_rate": "999.00",
        //                     "risk_level": "1",
        //                     "buy_enabled": false,
        //                     "sell_enabled": false,
        //                     "liquidate_price": null,
        //                     "liquidate_rate": "1.15",
        //                     "base": {
        //                         "currency": "BTC",
        //                         "borrow_enabled": true,
        //                         "borrowed": "0.00000000",
        //                         "available": "0.00000000",
        //                         "frozen": "0.00000000",
        //                         "net_asset": "0.00000000",
        //                         "net_assetBTC": "0.00000000",
        //                         "total_asset": "0.00000000",
        //                         "borrow_unpaid": "0.00000000",
        //                         "interest_unpaid": "0.00000000"
        //                     },
        //                     "quote": {
        //                         "currency": "USDT",
        //                         "borrow_enabled": true,
        //                         "borrowed": "0.00000000",
        //                         "available": "20.00000000",
        //                         "frozen": "0.00000000",
        //                         "net_asset": "20.00000000",
        //                         "net_assetBTC": "0.00118008",
        //                         "total_asset": "20.00000000",
        //                         "borrow_unpaid": "0.00000000",
        //                         "interest_unpaid": "0.00000000"
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        //
        return this.customParseBalance(response, marketType);
    }
    parseTradingFee(fee, market = undefined) {
        //
        //     {
        //         "symbol": "ETH_USDT",
        //         "taker_fee_rate": "0.0025",
        //         "maker_fee_rate": "0.0025"
        //     }
        //
        const marketId = this.safeString(fee, 'symbol');
        const symbol = this.safeSymbol(marketId);
        return {
            'info': fee,
            'symbol': symbol,
            'maker': this.safeNumber(fee, 'maker_fee_rate'),
            'taker': this.safeNumber(fee, 'taker_fee_rate'),
        };
    }
    async fetchTradingFee(symbol, params = {}) {
        /**
         * @method
         * @name bitmart#fetchTradingFee
         * @description fetch the trading fees for a market
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [fee structure]{@link https://docs.ccxt.com/#/?id=fee-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['spot']) {
            throw new errors.NotSupported(this.id + ' fetchTradingFee() does not support ' + market['type'] + ' orders, only spot orders are accepted');
        }
        const request = {
            'symbol': market['id'],
        };
        const response = await this.privateGetSpotV1TradeFee(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": "1000",
        //         "trace": "5a6f1e40-37fe-4849-a494-03279fadcc62",
        //         "data": {
        //             "symbol": "ETH_USDT",
        //             "taker_fee_rate": "0.0025",
        //             "maker_fee_rate": "0.0025"
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data');
        return this.parseTradingFee(data);
    }
    parseOrder(order, market = undefined) {
        //
        // createOrder
        //
        //     {
        //         "order_id": 2707217580
        //     }
        //
        // swap
        //   "data": {
        //       "order_id": 231116359426639,
        //       "price": "market price"
        //    },
        //
        // cancelOrder
        //
        //     "2707217580" // order id
        //
        // spot fetchOrder, fetchOrdersByStatus, fetchOpenOrders, fetchClosedOrders
        //
        //     {
        //         "order_id":1736871726781,
        //         "symbol":"BTC_USDT",
        //         "create_time":1591096004000,
        //         "side":"sell",
        //         "type":"market", // limit, market, limit_maker, ioc
        //         "price":"0.00",
        //         "price_avg":"0.00",
        //         "size":"0.02000",
        //         "notional":"0.00000000",
        //         "filled_notional":"0.00000000",
        //         "filled_size":"0.00000",
        //         "status":"8"
        //     }
        //
        // spot v4
        //    {
        //        "orderId" : "118100034543076010",
        //        "clientOrderId" : "118100034543076010",
        //        "symbol" : "BTC_USDT",
        //        "side" : "buy",
        //        "orderMode" : "spot",
        //        "type" : "limit",
        //        "state" : "filled",
        //        "price" : "48800.00",
        //        "priceAvg" : "39999.00",
        //        "size" : "0.10000",
        //        "filledSize" : "0.10000",
        //        "notional" : "4880.00000000",
        //        "filledNotional" : "3999.90000000",
        //        "createTime" : 1681701557927,
        //        "updateTime" : 1681701559408
        //    }
        //
        // swap: fetchOrder, fetchOpenOrders, fetchClosedOrders
        //
        //     {
        //         "order_id": "230935812485489",
        //         "client_order_id": "",
        //         "price": "24000",
        //         "size": "1",
        //         "symbol": "BTCUSDT",
        //         "state": 2,
        //         "side": 1,
        //         "type": "limit",
        //         "leverage": "10",
        //         "open_type": "isolated",
        //         "deal_avg_price": "0",
        //         "deal_size": "0",
        //         "create_time": 1695702258629,
        //         "update_time": 1695702258642,
        //         "activation_price_type": 0,
        //         "activation_price": "",
        //         "callback_rate": ""
        //     }
        //
        let id = undefined;
        if (typeof order === 'string') {
            id = order;
            order = {};
        }
        id = this.safeString2(order, 'order_id', 'orderId', id);
        const timestamp = this.safeInteger2(order, 'create_time', 'createTime');
        const marketId = this.safeString(order, 'symbol');
        const symbol = this.safeSymbol(marketId, market);
        market = this.safeMarket(symbol, market);
        const orderType = this.safeString(market, 'type', 'spot');
        let type = this.safeString(order, 'type');
        let timeInForce = undefined;
        let postOnly = undefined;
        if (type === 'limit_maker') {
            type = 'limit';
            postOnly = true;
            timeInForce = 'PO';
        }
        if (type === 'ioc') {
            type = 'limit';
            timeInForce = 'IOC';
        }
        let priceString = this.safeString(order, 'price');
        if (priceString === 'market price') {
            priceString = undefined;
        }
        const trailingStopActivationPrice = this.safeNumber(order, 'activation_price');
        return this.safeOrder({
            'id': id,
            'clientOrderId': this.safeString(order, 'client_order_id'),
            'info': order,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': this.safeInteger(order, 'update_time'),
            'symbol': symbol,
            'type': type,
            'timeInForce': timeInForce,
            'postOnly': postOnly,
            'side': this.parseOrderSide(this.safeString(order, 'side')),
            'price': this.omitZero(priceString),
            'stopPrice': trailingStopActivationPrice,
            'triggerPrice': trailingStopActivationPrice,
            'amount': this.omitZero(this.safeString(order, 'size')),
            'cost': this.safeString2(order, 'filled_notional', 'filledNotional'),
            'average': this.safeStringN(order, ['price_avg', 'priceAvg', 'deal_avg_price']),
            'filled': this.safeStringN(order, ['filled_size', 'filledSize', 'deal_size']),
            'remaining': undefined,
            'status': this.parseOrderStatusByType(orderType, this.safeString2(order, 'status', 'state')),
            'fee': undefined,
            'trades': undefined,
        }, market);
    }
    parseOrderSide(side) {
        const sides = {
            '1': 'buy',
            '2': 'buy',
            '3': 'sell',
            '4': 'sell',
        };
        return this.safeString(sides, side, side);
    }
    parseOrderStatusByType(type, status) {
        const statusesByType = {
            'spot': {
                '1': 'rejected',
                '2': 'open',
                '3': 'rejected',
                '4': 'open',
                '5': 'open',
                '6': 'closed',
                '7': 'canceled',
                '8': 'canceled',
                'new': 'open',
                'partially_filled': 'open',
                'filled': 'closed',
                'partially_canceled': 'canceled',
            },
            'swap': {
                '1': 'open',
                '2': 'open',
                '4': 'closed', // Completed
            },
        };
        const statuses = this.safeValue(statusesByType, type, {});
        return this.safeString(statuses, status, status);
    }
    async createMarketBuyOrderWithCost(symbol, cost, params = {}) {
        /**
         * @method
         * @name bitmart#createMarketBuyOrderWithCost
         * @description create a market buy order by providing the symbol and cost
         * @see https://developer-pro.bitmart.com/en/spot/#new-order-v2-signed
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {float} cost how much you want to trade in units of the quote currency
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['spot']) {
            throw new errors.NotSupported(this.id + ' createMarketBuyOrderWithCost() supports spot orders only');
        }
        params['createMarketBuyOrderRequiresPrice'] = false;
        return await this.createOrder(symbol, 'market', 'buy', cost, undefined, params);
    }
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#createOrder
         * @description create a trade order
         * @see https://developer-pro.bitmart.com/en/spot/#new-order-v2-signed
         * @see https://developer-pro.bitmart.com/en/spot/#place-margin-order
         * @see https://developer-pro.bitmart.com/en/futures/#submit-order-signed
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market', 'limit' or 'trailing' for swap markets only
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} [price] the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.marginMode] 'cross' or 'isolated'
         * @param {string} [params.leverage] *swap only* leverage level
         * @param {string} [params.clientOrderId] client order id of the order
         * @param {boolean} [params.reduceOnly] *swap only* reduce only
         * @param {boolean} [params.postOnly] make sure the order is posted to the order book and not matched immediately
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const result = this.handleMarginModeAndParams('createOrder', params);
        const marginMode = this.safeString(result, 0);
        let response = undefined;
        if (market['spot']) {
            const spotRequest = this.createSpotOrderRequest(symbol, type, side, amount, price, params);
            if (marginMode === 'isolated') {
                response = await this.privatePostSpotV1MarginSubmitOrder(spotRequest);
            }
            else {
                response = await this.privatePostSpotV2SubmitOrder(spotRequest);
            }
        }
        else {
            const swapRequest = this.createSwapOrderRequest(symbol, type, side, amount, price, params);
            response = await this.privatePostContractPrivateSubmitOrder(swapRequest);
        }
        //
        // spot and margin
        //
        //     {
        //         "code": 1000,
        //         "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",
        //         "message": "OK",
        //         "data": {
        //             "order_id": 2707217580
        //         }
        //     }
        //
        // swap
        // {"code":1000,"message":"Ok","data":{"order_id":231116359426639,"price":"market price"},"trace":"7f9c94e10f9d4513bc08a7bfc2a5559a.62.16996369620521911"}
        //
        const data = this.safeValue(response, 'data', {});
        const order = this.parseOrder(data, market);
        order['type'] = type;
        order['side'] = side;
        order['amount'] = amount;
        order['price'] = price;
        return order;
    }
    createSwapOrderRequest(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#createSwapOrderRequest
         * @ignore
         * @description create a trade order
         * @see https://developer-pro.bitmart.com/en/futures/#submit-order-signed
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market', 'limit' or 'trailing'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} [price] the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.leverage] leverage level
         * @param {boolean} [params.reduceOnly] *swap only* reduce only
         * @param {string} [params.marginMode] 'cross' or 'isolated', default is 'cross'
         * @param {string} [params.clientOrderId] client order id of the order
         * @param {int} [params.activation_price_type] *swap trailing order only* 1: last price, 2: fair price, default is 1
         * @param {string} [params.callback_rate] *swap trailing order only* min 0.1, max 5 where 1 is 1%, default is "1"
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
            'type': type,
            'size': parseInt(this.amountToPrecision(symbol, amount)),
        };
        const timeInForce = this.safeString(params, 'timeInForce');
        const mode = this.safeInteger(params, 'mode'); // only for swap
        const isMarketOrder = type === 'market';
        let postOnly = undefined;
        let reduceOnly = this.safeValue(params, 'reduceOnly');
        const isExchangeSpecificPo = (mode === 4);
        [postOnly, params] = this.handlePostOnly(isMarketOrder, isExchangeSpecificPo, params);
        params = this.omit(params, ['timeInForce', 'postOnly', 'reduceOnly']);
        const ioc = ((timeInForce === 'IOC') || (mode === 3));
        const isLimitOrder = (type === 'limit') || postOnly || ioc;
        if (timeInForce === 'GTC') {
            request['mode'] = 1;
        }
        else if (timeInForce === 'FOK') {
            request['mode'] = 2;
        }
        else if (timeInForce === 'IOC') {
            request['mode'] = 3;
        }
        if (postOnly) {
            request['mode'] = 4;
        }
        if (isLimitOrder) {
            request['price'] = this.priceToPrecision(symbol, price);
        }
        else if (type === 'trailing') {
            reduceOnly = true;
            request['activation_price'] = this.priceToPrecision(symbol, price);
            request['activation_price_type'] = this.safeInteger(params, 'activation_price_type', 1);
            request['callback_rate'] = this.safeString(params, 'callback_rate', '1');
        }
        if (side === 'buy') {
            if (reduceOnly) {
                request['side'] = 2; // buy close short
            }
            else {
                request['side'] = 1; // buy open long
            }
        }
        else if (side === 'sell') {
            if (reduceOnly) {
                request['side'] = 3; // sell close long
            }
            else {
                request['side'] = 4; // sell open short
            }
        }
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('createOrder', params, 'cross');
        request['open_type'] = marginMode;
        const clientOrderId = this.safeString(params, 'clientOrderId');
        if (clientOrderId !== undefined) {
            params = this.omit(params, 'clientOrderId');
            request['client_order_id'] = clientOrderId;
        }
        const leverage = this.safeInteger(params, 'leverage', 1);
        params = this.omit(params, 'leverage');
        request['leverage'] = this.numberToString(leverage);
        return this.extend(request, params);
    }
    createSpotOrderRequest(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#createSpotOrderRequest
         * @ignore
         * @description create a spot order request
         * @see https://developer-pro.bitmart.com/en/spot/#place-spot-order
         * @see https://developer-pro.bitmart.com/en/spot/#place-margin-order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} [price] the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.marginMode] 'cross' or 'isolated'
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
            'side': side,
            'type': type,
        };
        const timeInForce = this.safeString(params, 'timeInForce');
        if (timeInForce === 'FOK') {
            throw new errors.InvalidOrder(this.id + ' createOrder() only accepts timeInForce parameter values of IOC or PO');
        }
        const mode = this.safeInteger(params, 'mode'); // only for swap
        const isMarketOrder = type === 'market';
        let postOnly = undefined;
        const isExchangeSpecificPo = (type === 'limit_maker') || (mode === 4);
        [postOnly, params] = this.handlePostOnly(isMarketOrder, isExchangeSpecificPo, params);
        params = this.omit(params, ['timeInForce', 'postOnly']);
        const ioc = ((timeInForce === 'IOC') || (type === 'ioc'));
        const isLimitOrder = (type === 'limit') || postOnly || ioc;
        // method = 'privatePostSpotV2SubmitOrder';
        if (isLimitOrder) {
            request['size'] = this.amountToPrecision(symbol, amount);
            request['price'] = this.priceToPrecision(symbol, price);
        }
        else if (isMarketOrder) {
            // for market buy it requires the amount of quote currency to spend
            if (side === 'buy') {
                let notional = this.safeNumber2(params, 'cost', 'notional');
                params = this.omit(params, 'cost');
                let createMarketBuyOrderRequiresPrice = true;
                [createMarketBuyOrderRequiresPrice, params] = this.handleOptionAndParams(params, 'createOrder', 'createMarketBuyOrderRequiresPrice', true);
                if (createMarketBuyOrderRequiresPrice) {
                    if ((price === undefined) && (notional === undefined)) {
                        throw new errors.InvalidOrder(this.id + ' createOrder() requires the price argument for market buy orders to calculate the total cost to spend (amount * price), alternatively set the createMarketBuyOrderRequiresPrice option or param to false and pass the cost to spend in the amount argument or in the "notional" extra parameter (the exchange-specific behaviour)');
                    }
                    else {
                        const amountString = this.numberToString(amount);
                        const priceString = this.numberToString(price);
                        notional = this.parseNumber(Precise["default"].stringMul(amountString, priceString));
                    }
                }
                else {
                    notional = (notional === undefined) ? amount : notional;
                }
                request['notional'] = this.decimalToPrecision(notional, number.TRUNCATE, market['precision']['price'], this.precisionMode);
            }
            else if (side === 'sell') {
                request['size'] = this.amountToPrecision(symbol, amount);
            }
        }
        if (postOnly) {
            request['type'] = 'limit_maker';
        }
        if (ioc) {
            request['type'] = 'ioc';
        }
        return this.extend(request, params);
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#cancelOrder
         * @see https://developer-pro.bitmart.com/en/futures/#cancel-order-signed
         * @see https://developer-pro.bitmart.com/en/spot/#cancel-order-v3-signed
         * @see https://developer-pro.bitmart.com/en/futures/#cancel-plan-order-signed
         * @description cancels an open order
         * @param {string} id order id
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.clientOrderId] *spot only* the client order id of the order to cancel
         * @param {boolean} [params.stop] *swap only* whether the order is a stop order
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' cancelOrder() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const clientOrderId = this.safeString2(params, 'clientOrderId', 'client_order_id');
        if (clientOrderId !== undefined) {
            request['client_order_id'] = clientOrderId;
        }
        else {
            request['order_id'] = id.toString();
        }
        params = this.omit(params, ['clientOrderId']);
        let response = undefined;
        if (market['spot']) {
            response = await this.privatePostSpotV3CancelOrder(this.extend(request, params));
        }
        else {
            const stop = this.safeValue(params, 'stop');
            params = this.omit(params, ['stop']);
            if (!stop) {
                response = await this.privatePostContractPrivateCancelOrder(this.extend(request, params));
            }
            else {
                response = await this.privatePostContractPrivateCancelPlanOrder(this.extend(request, params));
            }
        }
        // swap
        // {"code":1000,"message":"Ok","trace":"7f9c94e10f9d4513bc08a7bfc2a5559a.55.16959817848001851"}
        //
        // spot
        //
        //     {
        //         "code": 1000,
        //         "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",
        //         "message": "OK",
        //         "data": {
        //             "result": true
        //         }
        //     }
        //
        // spot alternative
        //
        //     {
        //         "code": 1000,
        //         "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",
        //         "message": "OK",
        //         "data": true
        //     }
        //
        if (market['swap']) {
            return response;
        }
        const data = this.safeValue(response, 'data');
        if (data === true) {
            return this.parseOrder(id, market);
        }
        const succeeded = this.safeValue(data, 'succeed');
        if (succeeded !== undefined) {
            id = this.safeString(succeeded, 0);
            if (id === undefined) {
                throw new errors.InvalidOrder(this.id + ' cancelOrder() failed to cancel ' + symbol + ' order id ' + id);
            }
        }
        else {
            const result = this.safeValue(data, 'result');
            if (!result) {
                throw new errors.InvalidOrder(this.id + ' cancelOrder() ' + symbol + ' order id ' + id + ' is filled or canceled');
            }
        }
        const order = this.parseOrder(id, market);
        return this.extend(order, { 'id': id });
    }
    async cancelAllOrders(symbol = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#cancelAllOrders
         * @description cancel all open orders in a market
         * @see https://developer-pro.bitmart.com/en/spot/#cancel-all-orders
         * @see https://developer-pro.bitmart.com/en/futures/#cancel-all-orders-signed
         * @param {string} symbol unified market symbol of the market to cancel orders in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.side] *spot only* 'buy' or 'sell'
         * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const request = {};
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        let response = undefined;
        let type = undefined;
        [type, params] = this.handleMarketTypeAndParams('cancelAllOrders', market, params);
        if (type === 'spot') {
            response = await this.privatePostSpotV1CancelOrders(this.extend(request, params));
        }
        else if (type === 'swap') {
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' cancelAllOrders() requires a symbol argument');
            }
            response = await this.privatePostContractPrivateCancelOrders(this.extend(request, params));
        }
        //
        // spot
        //
        //     {
        //         "code": 1000,
        //         "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",
        //         "message": "OK",
        //         "data": {}
        //     }
        //
        // swap
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "trace": "7f9c94e10f9d4513bc08a7bfc2a5559a.70.16954131323145323"
        //     }
        //
        return response;
    }
    async fetchOrdersByStatus(status, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchOrdersByStatus() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['spot']) {
            throw new errors.NotSupported(this.id + ' fetchOrdersByStatus() does not support ' + market['type'] + ' orders, only spot orders are accepted');
        }
        const request = {
            'symbol': market['id'],
            'offset': 1,
            'N': 100, // max limit is 100
        };
        if (status === 'open') {
            request['status'] = 9;
        }
        else if (status === 'closed') {
            request['status'] = 6;
        }
        else if (status === 'canceled') {
            request['status'] = 8;
        }
        else {
            request['status'] = status;
        }
        const response = await this.privateGetSpotV3Orders(this.extend(request, params));
        //
        // spot
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"70e7d427-7436-4fb8-8cdd-97e1f5eadbe9",
        //         "data":{
        //             "current_page":1,
        //             "orders":[
        //                 {
        //                     "order_id":2147601241,
        //                     "symbol":"BTC_USDT",
        //                     "create_time":1591099963000,
        //                     "side":"sell",
        //                     "type":"limit",
        //                     "price":"9000.00",
        //                     "price_avg":"0.00",
        //                     "size":"1.00000",
        //                     "notional":"9000.00000000",
        //                     "filled_notional":"0.00000000",
        //                     "filled_size":"0.00000",
        //                     "status":"4"
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const orders = this.safeValue(data, 'orders', []);
        return this.parseOrders(orders, market, since, limit);
    }
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchOpenOrders
         * @see https://developer-pro.bitmart.com/en/spot/#current-open-orders-v4-signed
         * @see https://developer-pro.bitmart.com/en/futures/#get-all-open-orders-keyed
         * @description fetch all unfilled currently open orders
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch open orders for
         * @param {int} [limit] the maximum number of open order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.marginMode] *spot* whether to fetch trades for margin orders or spot orders, defaults to spot orders (only isolated margin orders are supported)
         * @param {int} [params.until] *spot* the latest time in ms to fetch orders for
         * @param {string} [params.type] *swap* order type, 'limit' or 'market'
         * @param {string} [params.order_state] *swap* the order state, 'all' or 'partially_filled', default is 'all'
         * @param {string} [params.orderType] *swap only* 'limit', 'market', or 'trailing'
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        let market = undefined;
        const request = {};
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        let type = undefined;
        let response = undefined;
        [type, params] = this.handleMarketTypeAndParams('fetchOpenOrders', market, params);
        if (type === 'spot') {
            let marginMode = undefined;
            [marginMode, params] = this.handleMarginModeAndParams('fetchOpenOrders', params);
            if (marginMode === 'isolated') {
                request['orderMode'] = 'iso_margin';
            }
            if (since !== undefined) {
                request['startTime'] = since;
            }
            const until = this.safeInteger2(params, 'until', 'endTime');
            if (until !== undefined) {
                params = this.omit(params, ['endTime']);
                request['endTime'] = until;
            }
            response = await this.privatePostSpotV4QueryOpenOrders(this.extend(request, params));
        }
        else if (type === 'swap') {
            const orderType = this.safeString(params, 'orderType');
            params = this.omit(params, 'orderType');
            if (orderType !== undefined) {
                request['type'] = orderType;
            }
            response = await this.privateGetContractPrivateGetOpenOrders(this.extend(request, params));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchOpenOrders() does not support ' + type + ' orders, only spot and swap orders are accepted');
        }
        //
        // spot
        //
        //     {
        //         "code": 1000,
        //         "message": "success",
        //         "data": [
        //             {
        //                 "orderId": "183299373022163211",
        //                 "clientOrderId": "183299373022163211",
        //                 "symbol": "BTC_USDT",
        //                 "side": "buy",
        //                 "orderMode": "spot",
        //                 "type": "limit",
        //                 "state": "new",
        //                 "price": "25000.00",
        //                 "priceAvg": "0.00",
        //                 "size": "0.00020",
        //                 "filledSize": "0.00000",
        //                 "notional": "5.00000000",
        //                 "filledNotional": "0.00000000",
        //                 "createTime": 1695703703338,
        //                 "updateTime": 1695703703359
        //             }
        //         ],
        //         "trace": "15f11d48e3234c81a2e786cr2e7a38e6.71.16957022303515933"
        //     }
        //
        // swap
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": [
        //             {
        //                 "order_id": "230935812485489",
        //                 "client_order_id": "",
        //                 "price": "24000",
        //                 "size": "1",
        //                 "symbol": "BTCUSDT",
        //                 "state": 2,
        //                 "side": 1,
        //                 "type": "limit",
        //                 "leverage": "10",
        //                 "open_type": "isolated",
        //                 "deal_avg_price": "0",
        //                 "deal_size": "0",
        //                 "create_time": 1695702258629,
        //                 "update_time": 1695702258642
        //             }
        //         ],
        //         "trace": "7f9d94g10f9d4513bc08a7rfc3a5559a.71.16957022303515933"
        //     }
        //
        const data = this.safeValue(response, 'data', []);
        return this.parseOrders(data, market, since, limit);
    }
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchClosedOrders
         * @see https://developer-pro.bitmart.com/en/spot/#account-orders-v4-signed
         * @see https://developer-pro.bitmart.com/en/futures/#get-order-history-keyed
         * @description fetches information on multiple closed orders made by the user
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] timestamp in ms of the latest entry
         * @param {string} [params.marginMode] *spot only* 'cross' or 'isolated', for margin trading
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        let market = undefined;
        const request = {};
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        let type = undefined;
        [type, params] = this.handleMarketTypeAndParams('fetchClosedOrders', market, params);
        if (type !== 'spot') {
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' fetchClosedOrders() requires a symbol argument');
            }
        }
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchClosedOrders', params);
        if (marginMode === 'isolated') {
            request['orderMode'] = 'iso_margin';
        }
        const startTimeKey = (type === 'spot') ? 'startTime' : 'start_time';
        if (since !== undefined) {
            request[startTimeKey] = since;
        }
        const endTimeKey = (type === 'spot') ? 'endTime' : 'end_time';
        const until = this.safeInteger2(params, 'until', endTimeKey);
        if (until !== undefined) {
            params = this.omit(params, ['until']);
            request[endTimeKey] = until;
        }
        let response = undefined;
        if (type === 'spot') {
            response = await this.privatePostSpotV4QueryHistoryOrders(this.extend(request, params));
        }
        else {
            response = await this.privateGetContractPrivateOrderHistory(this.extend(request, params));
        }
        const data = this.safeValue(response, 'data', []);
        return this.parseOrders(data, market, since, limit);
    }
    async fetchCanceledOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchCanceledOrders
         * @description fetches information on multiple canceled orders made by the user
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int} [since] timestamp in ms of the earliest order, default is undefined
         * @param {int} [limit] max number of orders to return, default is undefined
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        return await this.fetchOrdersByStatus('canceled', symbol, since, limit, params);
    }
    async fetchOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchOrder
         * @description fetches information on an order made by the user
         * @see https://developer-pro.bitmart.com/en/spot/#query-order-by-id-v4-signed
         * @see https://developer-pro.bitmart.com/en/spot/#query-order-by-clientorderid-v4-signed
         * @see https://developer-pro.bitmart.com/en/futures/#get-order-detail-keyed
         * @param {string} id the id of the order
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.clientOrderId] *spot* fetch the order by client order id instead of order id
         * @param {string} [params.orderType] *swap only* 'limit', 'market', 'liquidate', 'bankruptcy', 'adl' or 'trailing'
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const request = {};
        let type = undefined;
        let market = undefined;
        let response = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        [type, params] = this.handleMarketTypeAndParams('fetchOrder', market, params);
        if (type === 'spot') {
            const clientOrderId = this.safeString(params, 'clientOrderId');
            if (!clientOrderId) {
                request['orderId'] = id;
            }
            if (clientOrderId !== undefined) {
                response = await this.privatePostSpotV4QueryClientOrder(this.extend(request, params));
            }
            else {
                response = await this.privatePostSpotV4QueryOrder(this.extend(request, params));
            }
        }
        else if (type === 'swap') {
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' fetchOrder() requires a symbol argument');
            }
            const orderType = this.safeString(params, 'orderType');
            params = this.omit(params, 'orderType');
            if (orderType !== undefined) {
                request['type'] = orderType;
            }
            request['symbol'] = market['id'];
            request['order_id'] = id;
            response = await this.privateGetContractPrivateOrder(this.extend(request, params));
        }
        //
        // spot
        //
        //     {
        //         "code": 1000,
        //         "message": "success",
        //         "data": {
        //             "orderId": "183347420821295423",
        //             "clientOrderId": "183347420821295423",
        //             "symbol": "BTC_USDT",
        //             "side": "buy",
        //             "orderMode": "spot",
        //             "type": "limit",
        //             "state": "new",
        //             "price": "24000.00",
        //             "priceAvg": "0.00",
        //             "size": "0.00022",
        //             "filledSize": "0.00000",
        //             "notional": "5.28000000",
        //             "filledNotional": "0.00000000",
        //             "createTime": 1695783014734,
        //             "updateTime": 1695783014762
        //         },
        //         "trace": "ce3e6422c8b44d5fag855348a68693ed.63.14957831547451715"
        //     }
        //
        // swap
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": {
        //             "order_id": "230927283405028",
        //             "client_order_id": "",
        //             "price": "23000",
        //             "size": "1",
        //             "symbol": "BTCUSDT",
        //             "state": 2,
        //             "side": 1,
        //             "type": "limit",
        //             "leverage": "10",
        //             "open_type": "isolated",
        //             "deal_avg_price": "0",
        //             "deal_size": "0",
        //             "create_time": 1695783433600,
        //             "update_time": 1695783433613
        //         },
        //         "trace": "4cad855075664097af6ba5257c47605d.63.14957831547451715"
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        return this.parseOrder(data, market);
    }
    async fetchDepositAddress(code, params = {}) {
        /**
         * @method
         * @name bitmart#fetchDepositAddress
         * @description fetch the deposit address for a currency associated with this account
         * @param {string} code unified currency code
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
         */
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        if (code === 'USDT') {
            const defaultNetworks = this.safeValue(this.options, 'defaultNetworks');
            const defaultNetwork = this.safeStringUpper(defaultNetworks, code);
            const networks = this.safeValue(this.options, 'networks', {});
            let networkInner = this.safeStringUpper(params, 'network', defaultNetwork); // this line allows the user to specify either ERC20 or ETH
            networkInner = this.safeString(networks, networkInner, networkInner); // handle ERC20>ETH alias
            if (networkInner !== undefined) {
                request['currency'] = request['currency'] + '-' + networkInner; // when network the currency need to be changed to currency + '-' + network https://developer-pro.bitmart.com/en/account/withdraw_apply.html on the end of page
                params = this.omit(params, 'network');
            }
        }
        const response = await this.privateGetAccountV1DepositAddress(this.extend(request, params));
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"0e6edd79-f77f-4251-abe5-83ba75d06c1a",
        //         "data":{
        //             "currency":"USDT-TRC20",
        //             "chain":"USDT-TRC20",
        //             "address":"TGR3ghy2b5VLbyAYrmiE15jasR6aPHTvC5",
        //             "address_memo":""
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const address = this.safeString(data, 'address');
        const tag = this.safeString(data, 'address_memo');
        const chain = this.safeString(data, 'chain');
        let network = undefined;
        if (chain !== undefined) {
            const parts = chain.split('-');
            const networkId = this.safeString(parts, 1);
            network = this.safeNetwork(networkId);
        }
        this.checkAddress(address);
        return {
            'currency': code,
            'address': address,
            'tag': tag,
            'network': network,
            'info': response,
        };
    }
    safeNetwork(networkId) {
        // TODO: parse
        return networkId;
    }
    async withdraw(code, amount, address, tag = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#withdraw
         * @description make a withdrawal
         * @param {string} code unified currency code
         * @param {float} amount the amount to withdraw
         * @param {string} address the address to withdraw to
         * @param {string} tag
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        [tag, params] = this.handleWithdrawTagAndParams(tag, params);
        this.checkAddress(address);
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            'amount': amount,
            'destination': 'To Digital Address',
            'address': address,
        };
        if (tag !== undefined) {
            request['address_memo'] = tag;
        }
        if (code === 'USDT') {
            const defaultNetworks = this.safeValue(this.options, 'defaultNetworks');
            const defaultNetwork = this.safeStringUpper(defaultNetworks, code);
            const networks = this.safeValue(this.options, 'networks', {});
            let network = this.safeStringUpper(params, 'network', defaultNetwork); // this line allows the user to specify either ERC20 or ETH
            network = this.safeString(networks, network, network); // handle ERC20>ETH alias
            if (network !== undefined) {
                request['currency'] = request['currency'] + '-' + network; // when network the currency need to be changed to currency + '-' + network https://developer-pro.bitmart.com/en/account/withdraw_apply.html on the end of page
                params = this.omit(params, 'network');
            }
        }
        const response = await this.privatePostAccountV1WithdrawApply(this.extend(request, params));
        //
        //     {
        //         "code": 1000,
        //         "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",
        //         "message": "OK",
        //         "data": {
        //             "withdraw_id": "121212"
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data');
        const transaction = this.parseTransaction(data, currency);
        return this.extend(transaction, {
            'code': code,
            'address': address,
            'tag': tag,
        });
    }
    async fetchTransactionsByType(type, code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        if (limit === undefined) {
            limit = 50; // max 50
        }
        const request = {
            'operation_type': type,
            'offset': 1,
            'N': limit,
        };
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        if (code === 'USDT') {
            const defaultNetworks = this.safeValue(this.options, 'defaultNetworks');
            const defaultNetwork = this.safeStringUpper(defaultNetworks, code);
            const networks = this.safeValue(this.options, 'networks', {});
            let network = this.safeStringUpper(params, 'network', defaultNetwork); // this line allows the user to specify either ERC20 or ETH
            network = this.safeString(networks, network, network); // handle ERC20>ETH alias
            if (network !== undefined) {
                request['currency'] += '-' + network; // when network the currency need to be changed to currency + '-' + network https://developer-pro.bitmart.com/en/account/withdraw_apply.html on the end of page
                currency['code'] = request['currency']; // update currency code to filter
                params = this.omit(params, 'network');
            }
        }
        const response = await this.privateGetAccountV2DepositWithdrawHistory(this.extend(request, params));
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"142bf92a-fc50-4689-92b6-590886f90b97",
        //         "data":{
        //             "records":[
        //                 {
        //                     "withdraw_id":"1679952",
        //                     "deposit_id":"",
        //                     "operation_type":"withdraw",
        //                     "currency":"BMX",
        //                     "apply_time":1588867374000,
        //                     "arrival_amount":"59.000000000000",
        //                     "fee":"1.000000000000",
        //                     "status":0,
        //                     "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",
        //                     "address_memo":"",
        //                     "tx_id":""
        //                 },
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const records = this.safeValue(data, 'records', []);
        return this.parseTransactions(records, currency, since, limit);
    }
    async fetchDeposit(id, code = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchDeposit
         * @description fetch information on a deposit
         * @param {string} id deposit id
         * @param {string} code not used by bitmart fetchDeposit ()
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        await this.loadMarkets();
        const request = {
            'id': id,
        };
        const response = await this.privateGetAccountV1DepositWithdrawDetail(this.extend(request, params));
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",
        //         "data":{
        //             "record":{
        //                 "withdraw_id":"",
        //                 "deposit_id":"1679952",
        //                 "operation_type":"deposit",
        //                 "currency":"BMX",
        //                 "apply_time":1588867374000,
        //                 "arrival_amount":"59.000000000000",
        //                 "fee":"1.000000000000",
        //                 "status":0,
        //                 "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",
        //                 "address_memo":"",
        //                 "tx_id":""
        //             }
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const record = this.safeValue(data, 'record', {});
        return this.parseTransaction(record);
    }
    async fetchDeposits(code = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchDeposits
         * @description fetch all deposits made to an account
         * @param {string} code unified currency code
         * @param {int} [since] the earliest time in ms to fetch deposits for
         * @param {int} [limit] the maximum number of deposits structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        return await this.fetchTransactionsByType('deposit', code, since, limit, params);
    }
    async fetchWithdrawal(id, code = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchWithdrawal
         * @description fetch data on a currency withdrawal via the withdrawal id
         * @param {string} id withdrawal id
         * @param {string} code not used by bitmart.fetchWithdrawal
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        await this.loadMarkets();
        const request = {
            'id': id,
        };
        const response = await this.privateGetAccountV1DepositWithdrawDetail(this.extend(request, params));
        //
        //     {
        //         "message":"OK",
        //         "code":1000,
        //         "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",
        //         "data":{
        //             "record":{
        //                 "withdraw_id":"1679952",
        //                 "deposit_id":"",
        //                 "operation_type":"withdraw",
        //                 "currency":"BMX",
        //                 "apply_time":1588867374000,
        //                 "arrival_amount":"59.000000000000",
        //                 "fee":"1.000000000000",
        //                 "status":0,
        //                 "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",
        //                 "address_memo":"",
        //                 "tx_id":""
        //             }
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const record = this.safeValue(data, 'record', {});
        return this.parseTransaction(record);
    }
    async fetchWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchWithdrawals
         * @description fetch all withdrawals made from an account
         * @param {string} code unified currency code
         * @param {int} [since] the earliest time in ms to fetch withdrawals for
         * @param {int} [limit] the maximum number of withdrawals structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        return await this.fetchTransactionsByType('withdraw', code, since, limit, params);
    }
    parseTransactionStatus(status) {
        const statuses = {
            '0': 'pending',
            '1': 'pending',
            '2': 'pending',
            '3': 'ok',
            '4': 'canceled',
            '5': 'failed', // Fail
        };
        return this.safeString(statuses, status, status);
    }
    parseTransaction(transaction, currency = undefined) {
        //
        // withdraw
        //
        //     {
        //         "withdraw_id": "121212"
        //     }
        //
        // fetchDeposits, fetchWithdrawals, fetchWithdrawal
        //
        //     {
        //         "withdraw_id":"1679952",
        //         "deposit_id":"",
        //         "operation_type":"withdraw",
        //         "currency":"BMX",
        //         "apply_time":1588867374000,
        //         "arrival_amount":"59.000000000000",
        //         "fee":"1.000000000000",
        //         "status":0,
        //         "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",
        //         "address_memo":"",
        //         "tx_id":""
        //     }
        //
        let id = undefined;
        const withdrawId = this.safeString(transaction, 'withdraw_id');
        const depositId = this.safeString(transaction, 'deposit_id');
        let type = undefined;
        if ((withdrawId !== undefined) && (withdrawId !== '')) {
            type = 'withdraw';
            id = withdrawId;
        }
        else if ((depositId !== undefined) && (depositId !== '')) {
            type = 'deposit';
            id = depositId;
        }
        const amount = this.safeNumber(transaction, 'arrival_amount');
        const timestamp = this.safeInteger(transaction, 'apply_time');
        const currencyId = this.safeString(transaction, 'currency');
        const code = this.safeCurrencyCode(currencyId, currency);
        const status = this.parseTransactionStatus(this.safeString(transaction, 'status'));
        const feeCost = this.safeNumber(transaction, 'fee');
        let fee = undefined;
        if (feeCost !== undefined) {
            fee = {
                'cost': feeCost,
                'currency': code,
            };
        }
        const txid = this.safeString(transaction, 'tx_id');
        const address = this.safeString(transaction, 'address');
        const tag = this.safeString(transaction, 'address_memo');
        return {
            'info': transaction,
            'id': id,
            'currency': code,
            'amount': amount,
            'network': undefined,
            'address': address,
            'addressFrom': undefined,
            'addressTo': undefined,
            'tag': tag,
            'tagFrom': undefined,
            'tagTo': undefined,
            'status': status,
            'type': type,
            'updated': undefined,
            'txid': txid,
            'internal': undefined,
            'comment': undefined,
            'timestamp': (timestamp !== 0) ? timestamp : undefined,
            'datetime': (timestamp !== 0) ? this.iso8601(timestamp) : undefined,
            'fee': fee,
        };
    }
    async repayIsolatedMargin(symbol, code, amount, params = {}) {
        /**
         * @method
         * @name bitmart#repayIsolatedMargin
         * @description repay borrowed margin and interest
         * @see https://developer-pro.bitmart.com/en/spot/#margin-repay-isolated
         * @param {string} symbol unified market symbol
         * @param {string} code unified currency code of the currency to repay
         * @param {string} amount the amount to repay
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [margin loan structure]{@link https://docs.ccxt.com/#/?id=margin-loan-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const currency = this.currency(code);
        const request = {
            'symbol': market['id'],
            'currency': currency['id'],
            'amount': this.currencyToPrecision(code, amount),
        };
        const response = await this.privatePostSpotV1MarginIsolatedRepay(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "b0a60b4c-e986-4b54-a190-8f7c05ddf685",
        //         "data": {
        //             "repay_id": "2afcc16d99bd4707818c5a355dc89bed"
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const transaction = this.parseMarginLoan(data, currency);
        return this.extend(transaction, {
            'amount': amount,
            'symbol': symbol,
        });
    }
    async borrowIsolatedMargin(symbol, code, amount, params = {}) {
        /**
         * @method
         * @name bitmart#borrowIsolatedMargin
         * @description create a loan to borrow margin
         * @see https://developer-pro.bitmart.com/en/spot/#margin-borrow-isolated
         * @param {string} symbol unified market symbol
         * @param {string} code unified currency code of the currency to borrow
         * @param {string} amount the amount to borrow
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [margin loan structure]{@link https://docs.ccxt.com/#/?id=margin-loan-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const currency = this.currency(code);
        const request = {
            'symbol': market['id'],
            'currency': currency['id'],
            'amount': this.currencyToPrecision(code, amount),
        };
        const response = await this.privatePostSpotV1MarginIsolatedBorrow(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "e6fda683-181e-4e78-ac9c-b27c4c8ba035",
        //         "data": {
        //             "borrow_id": "629a7177a4ed4cf09869c6a4343b788c"
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const transaction = this.parseMarginLoan(data, currency);
        return this.extend(transaction, {
            'amount': amount,
            'symbol': symbol,
        });
    }
    parseMarginLoan(info, currency = undefined) {
        //
        // borrowMargin
        //
        //     {
        //         "borrow_id": "629a7177a4ed4cf09869c6a4343b788c",
        //     }
        //
        // repayMargin
        //
        //     {
        //         "repay_id": "2afcc16d99bd4707818c5a355dc89bed",
        //     }
        //
        const timestamp = this.milliseconds();
        return {
            'id': this.safeString2(info, 'borrow_id', 'repay_id'),
            'currency': this.safeCurrencyCode(undefined, currency),
            'amount': undefined,
            'symbol': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'info': info,
        };
    }
    async fetchIsolatedBorrowRate(symbol, params = {}) {
        /**
         * @method
         * @name bitmart#fetchIsolatedBorrowRate
         * @description fetch the rate of interest to borrow a currency for margin trading
         * @see https://developer-pro.bitmart.com/en/spot/#get-trading-pair-borrowing-rate-and-amount-keyed
         * @param {string} symbol unified symbol of the market to fetch the borrow rate for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an [isolated borrow rate structure]{@link https://github.com/ccxt/ccxt/wiki/Manual#isolated-borrow-rate-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.privateGetSpotV1MarginIsolatedPairs(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "0985a130-a5ae-4fc1-863f-4704e214f585",
        //         "data": {
        //             "symbols": [
        //                 {
        //                     "symbol": "BTC_USDT",
        //                     "max_leverage": "5",
        //                     "symbol_enabled": true,
        //                     "base": {
        //                         "currency": "BTC",
        //                         "daily_interest": "0.00055000",
        //                         "hourly_interest": "0.00002291",
        //                         "max_borrow_amount": "2.00000000",
        //                         "min_borrow_amount": "0.00000001",
        //                         "borrowable_amount": "0.00670810"
        //                     },
        //                     "quote": {
        //                         "currency": "USDT",
        //                         "daily_interest": "0.00055000",
        //                         "hourly_interest": "0.00002291",
        //                         "max_borrow_amount": "50000.00000000",
        //                         "min_borrow_amount": "0.00000001",
        //                         "borrowable_amount": "135.12575038"
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const symbols = this.safeValue(data, 'symbols', []);
        const borrowRate = this.safeValue(symbols, 0);
        return this.parseIsolatedBorrowRate(borrowRate, market);
    }
    parseIsolatedBorrowRate(info, market = undefined) {
        //
        //     {
        //         "symbol": "BTC_USDT",
        //         "max_leverage": "5",
        //         "symbol_enabled": true,
        //         "base": {
        //             "currency": "BTC",
        //             "daily_interest": "0.00055000",
        //             "hourly_interest": "0.00002291",
        //             "max_borrow_amount": "2.00000000",
        //             "min_borrow_amount": "0.00000001",
        //             "borrowable_amount": "0.00670810"
        //         },
        //         "quote": {
        //             "currency": "USDT",
        //             "daily_interest": "0.00055000",
        //             "hourly_interest": "0.00002291",
        //             "max_borrow_amount": "50000.00000000",
        //             "min_borrow_amount": "0.00000001",
        //             "borrowable_amount": "135.12575038"
        //         }
        //     }
        //
        const marketId = this.safeString(info, 'symbol');
        const symbol = this.safeSymbol(marketId, market);
        const baseData = this.safeValue(info, 'base', {});
        const quoteData = this.safeValue(info, 'quote', {});
        const baseId = this.safeString(baseData, 'currency');
        const quoteId = this.safeString(quoteData, 'currency');
        return {
            'symbol': symbol,
            'base': this.safeCurrencyCode(baseId),
            'baseRate': this.safeNumber(baseData, 'hourly_interest'),
            'quote': this.safeCurrencyCode(quoteId),
            'quoteRate': this.safeNumber(quoteData, 'hourly_interest'),
            'period': 3600000,
            'timestamp': undefined,
            'datetime': undefined,
            'info': info,
        };
    }
    async fetchIsolatedBorrowRates(params = {}) {
        /**
         * @method
         * @name bitmart#fetchIsolatedBorrowRates
         * @description fetch the borrow interest rates of all currencies, currently only works for isolated margin
         * @see https://developer-pro.bitmart.com/en/spot/#get-trading-pair-borrowing-rate-and-amount-keyed
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a list of [isolated borrow rate structures]{@link https://docs.ccxt.com/#/?id=isolated-borrow-rate-structure}
         */
        await this.loadMarkets();
        const response = await this.privateGetSpotV1MarginIsolatedPairs(params);
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "0985a130-a5ae-4fc1-863f-4704e214f585",
        //         "data": {
        //             "symbols": [
        //                 {
        //                     "symbol": "BTC_USDT",
        //                     "max_leverage": "5",
        //                     "symbol_enabled": true,
        //                     "base": {
        //                         "currency": "BTC",
        //                         "daily_interest": "0.00055000",
        //                         "hourly_interest": "0.00002291",
        //                         "max_borrow_amount": "2.00000000",
        //                         "min_borrow_amount": "0.00000001",
        //                         "borrowable_amount": "0.00670810"
        //                     },
        //                     "quote": {
        //                         "currency": "USDT",
        //                         "daily_interest": "0.00055000",
        //                         "hourly_interest": "0.00002291",
        //                         "max_borrow_amount": "50000.00000000",
        //                         "min_borrow_amount": "0.00000001",
        //                         "borrowable_amount": "135.12575038"
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const symbols = this.safeValue(data, 'symbols', []);
        const result = [];
        for (let i = 0; i < symbols.length; i++) {
            const symbol = this.safeValue(symbols, i);
            result.push(this.parseIsolatedBorrowRate(symbol));
        }
        return result;
    }
    async transfer(code, amount, fromAccount, toAccount, params = {}) {
        /**
         * @method
         * @name bitmart#transfer
         * @description transfer currency internally between wallets on the same account, currently only supports transfer between spot and margin
         * @see https://developer-pro.bitmart.com/en/spot/#margin-asset-transfer-signed
         * @see https://developer-pro.bitmart.com/en/futures/#transfer-signed
         * @param {string} code unified currency code
         * @param {float} amount amount to transfer
         * @param {string} fromAccount account to transfer from
         * @param {string} toAccount account to transfer to
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
         */
        await this.loadMarkets();
        const currency = this.currency(code);
        const amountToPrecision = this.currencyToPrecision(code, amount);
        const request = {
            'amount': amountToPrecision,
            'currency': currency['id'],
        };
        const fromId = this.convertTypeToAccount(fromAccount);
        const toId = this.convertTypeToAccount(toAccount);
        if (fromAccount === 'spot') {
            if (toAccount === 'margin') {
                request['side'] = 'in';
                request['symbol'] = toId;
            }
            else if (toAccount === 'swap') {
                request['type'] = 'spot_to_contract';
            }
        }
        else if (toAccount === 'spot') {
            if (fromAccount === 'margin') {
                request['side'] = 'out';
                request['symbol'] = fromId;
            }
            else if (fromAccount === 'swap') {
                request['type'] = 'contract_to_spot';
            }
        }
        else {
            throw new errors.ArgumentsRequired(this.id + ' transfer() requires either fromAccount or toAccount to be spot');
        }
        let response = undefined;
        if ((fromAccount === 'margin') || (toAccount === 'margin')) {
            response = await this.privatePostSpotV1MarginIsolatedTransfer(this.extend(request, params));
        }
        else if ((fromAccount === 'swap') || (toAccount === 'swap')) {
            response = await this.privatePostAccountV1TransferContract(this.extend(request, params));
        }
        //
        // margin
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "b26cecec-ef5a-47d9-9531-2bd3911d3d55",
        //         "data": {
        //             "transfer_id": "ca90d97a621e47d49774f19af6b029f5"
        //         }
        //     }
        //
        // swap
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "4cad858074667097ac6ba5257c57305d.68.16953302431189455",
        //         "data": {
        //             "currency": "USDT",
        //             "amount": "5"
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        return this.extend(this.parseTransfer(data, currency), {
            'status': this.parseTransferStatus(this.safeString2(response, 'code', 'message')),
        });
    }
    parseTransferStatus(status) {
        const statuses = {
            '1000': 'ok',
            'OK': 'ok',
            'FINISHED': 'ok',
        };
        return this.safeString(statuses, status, status);
    }
    parseTransferToAccount(type) {
        const types = {
            'contract_to_spot': 'spot',
            'spot_to_contract': 'swap',
        };
        return this.safeString(types, type, type);
    }
    parseTransferFromAccount(type) {
        const types = {
            'contract_to_spot': 'swap',
            'spot_to_contract': 'spot',
        };
        return this.safeString(types, type, type);
    }
    parseTransfer(transfer, currency = undefined) {
        //
        // margin
        //
        //     {
        //         "transfer_id": "ca90d97a621e47d49774f19af6b029f5"
        //     }
        //
        // swap
        //
        //     {
        //         "currency": "USDT",
        //         "amount": "5"
        //     }
        //
        // fetchTransfers
        //
        //     {
        //         "transfer_id": "902463535961567232",
        //         "currency": "USDT",
        //         "amount": "5",
        //         "type": "contract_to_spot",
        //         "state": "FINISHED",
        //         "timestamp": 1695330539565
        //     }
        //
        const currencyId = this.safeString(transfer, 'currency');
        const timestamp = this.safeInteger(transfer, 'timestamp');
        return {
            'id': this.safeString(transfer, 'transfer_id'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'currency': this.safeCurrencyCode(currencyId, currency),
            'amount': this.safeNumber(transfer, 'amount'),
            'fromAccount': this.parseTransferFromAccount(this.safeString(transfer, 'type')),
            'toAccount': this.parseTransferToAccount(this.safeString(transfer, 'type')),
            'status': this.parseTransferStatus(this.safeString(transfer, 'state')),
        };
    }
    async fetchTransfers(code = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchTransfers
         * @description fetch a history of internal transfers made on an account, only transfers between spot and swap are supported
         * @see https://developer-pro.bitmart.com/en/futures/#get-transfer-list-signed
         * @param {string} code unified currency code of the currency transferred
         * @param {int} [since] the earliest time in ms to fetch transfers for
         * @param {int} [limit] the maximum number of transfer structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.page] the required number of pages, default is 1, max is 1000
         * @param {int} [params.until] the latest time in ms to fetch transfers for
         * @returns {object[]} a list of [transfer structures]{@link https://docs.ccxt.com/#/?id=transfer-structure}
         */
        await this.loadMarkets();
        if (limit === undefined) {
            limit = 10;
        }
        const request = {
            'page': this.safeInteger(params, 'page', 1),
            'limit': limit, // default is 10, max is 100
        };
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        if (since !== undefined) {
            request['time_start'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const until = this.safeInteger2(params, 'until', 'till'); // unified in milliseconds
        const endTime = this.safeInteger(params, 'time_end', until); // exchange-specific in milliseconds
        params = this.omit(params, ['till', 'until']);
        if (endTime !== undefined) {
            request['time_end'] = endTime;
        }
        const response = await this.privatePostAccountV1TransferContractList(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "7f9d93e10f9g4513bc08a7btc2a5559a.69.16953325693032193",
        //         "data": {
        //             "records": [
        //                 {
        //                     "transfer_id": "902463535961567232",
        //                     "currency": "USDT",
        //                     "amount": "5",
        //                     "type": "contract_to_spot",
        //                     "state": "FINISHED",
        //                     "timestamp": 1695330539565
        //                 },
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const records = this.safeValue(data, 'records', []);
        return this.parseTransfers(records, currency, since, limit);
    }
    async fetchBorrowInterest(code = undefined, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchBorrowInterest
         * @description fetch the interest owed by the user for borrowing currency for margin trading
         * @see https://developer-pro.bitmart.com/en/spot/#get-borrow-record-isolated
         * @param {string} code unified currency code
         * @param {string} symbol unified market symbol when fetch interest in isolated markets
         * @param {int} [since] the earliest time in ms to fetch borrrow interest for
         * @param {int} [limit] the maximum number of structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [borrow interest structures]{@link https://docs.ccxt.com/#/?id=borrow-interest-structure}
         */
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchBorrowInterest() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['N'] = limit;
        }
        if (since !== undefined) {
            request['start_time'] = since;
        }
        const response = await this.privateGetSpotV1MarginIsolatedBorrowRecord(this.extend(request, params));
        //
        //     {
        //         "message": "OK",
        //         "code": 1000,
        //         "trace": "8ea27a2a-4aba-49fa-961d-43a0137b0ef3",
        //         "data": {
        //             "records": [
        //                 {
        //                     "borrow_id": "1659045283903rNvJnuRTJNL5J53n",
        //                     "symbol": "BTC_USDT",
        //                     "currency": "USDT",
        //                     "borrow_amount": "100.00000000",
        //                     "daily_interest": "0.00055000",
        //                     "hourly_interest": "0.00002291",
        //                     "interest_amount": "0.00229166",
        //                     "create_time": 1659045284000
        //                 },
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const rows = this.safeValue(data, 'records', []);
        const interest = this.parseBorrowInterests(rows, market);
        return this.filterByCurrencySinceLimit(interest, code, since, limit);
    }
    parseBorrowInterest(info, market = undefined) {
        //
        //     {
        //         "borrow_id": "1657664327844Lk5eJJugXmdHHZoe",
        //         "symbol": "BTC_USDT",
        //         "currency": "USDT",
        //         "borrow_amount": "20.00000000",
        //         "daily_interest": "0.00055000",
        //         "hourly_interest": "0.00002291",
        //         "interest_amount": "0.00045833",
        //         "create_time": 1657664329000
        //     }
        //
        const marketId = this.safeString(info, 'symbol');
        market = this.safeMarket(marketId, market);
        const timestamp = this.safeInteger(info, 'create_time');
        return {
            'symbol': this.safeString(market, 'symbol'),
            'marginMode': 'isolated',
            'currency': this.safeCurrencyCode(this.safeString(info, 'currency')),
            'interest': this.safeNumber(info, 'interest_amount'),
            'interestRate': this.safeNumber(info, 'hourly_interest'),
            'amountBorrowed': this.safeNumber(info, 'borrow_amount'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'info': info,
        };
    }
    async fetchOpenInterest(symbol, params = {}) {
        /**
         * @method
         * @name bitmart#fetchOpenInterest
         * @description Retrieves the open interest of a currency
         * @see https://developer-pro.bitmart.com/en/futures/#get-futures-openinterest
         * @param {string} symbol Unified CCXT market symbol
         * @param {object} [params] exchange specific parameters
         * @returns {object} an open interest structure{@link https://docs.ccxt.com/#/?id=open-interest-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['contract']) {
            throw new errors.BadRequest(this.id + ' fetchOpenInterest() supports contract markets only');
        }
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetContractPublicOpenInterest(this.extend(request, params));
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": {
        //             "timestamp": 1694657502415,
        //             "symbol": "BTCUSDT",
        //             "open_interest": "265231.721368593081729069",
        //             "open_interest_value": "7006353.83988919"
        //         },
        //         "trace": "7f9c94e10f9d4513bc08a7bfc2a5559a.72.16946575108274991"
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        return this.parseOpenInterest(data, market);
    }
    parseOpenInterest(interest, market = undefined) {
        //
        //     {
        //         "timestamp": 1694657502415,
        //         "symbol": "BTCUSDT",
        //         "open_interest": "265231.721368593081729069",
        //         "open_interest_value": "7006353.83988919"
        //     }
        //
        const timestamp = this.safeInteger(interest, 'timestamp');
        const id = this.safeString(interest, 'symbol');
        return this.safeOpenInterest({
            'symbol': this.safeSymbol(id, market),
            'openInterestAmount': this.safeNumber(interest, 'open_interest'),
            'openInterestValue': this.safeNumber(interest, 'open_interest_value'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'info': interest,
        }, market);
    }
    async setLeverage(leverage, symbol = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#setLeverage
         * @description set the level of leverage for a market
         * @see https://developer-pro.bitmart.com/en/futures/#submit-leverage-signed
         * @param {float} leverage the rate of leverage
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.marginMode] 'isolated' or 'cross'
         * @returns {object} response from the exchange
         */
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setLeverage() requires a symbol argument');
        }
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('setLeverage', params);
        this.checkRequiredArgument('setLeverage', marginMode, 'marginMode', ['isolated', 'cross']);
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['swap']) {
            throw new errors.BadSymbol(this.id + ' setLeverage() supports swap contracts only');
        }
        const request = {
            'symbol': market['id'],
            'leverage': leverage.toString(),
            'open_type': marginMode,
        };
        return await this.privatePostContractPrivateSubmitLeverage(this.extend(request, params));
    }
    async fetchFundingRate(symbol, params = {}) {
        /**
         * @method
         * @name bitmart#fetchFundingRate
         * @description fetch the current funding rate
         * @see https://developer-pro.bitmart.com/en/futures/#get-current-funding-rate
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [funding rate structure]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['swap']) {
            throw new errors.BadSymbol(this.id + ' fetchFundingRate() supports swap contracts only');
        }
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetContractPublicFundingRate(this.extend(request, params));
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": {
        //             "timestamp": 1695184410697,
        //             "symbol": "BTCUSDT",
        //             "rate_value": "-0.00002614",
        //             "expected_rate": "-0.00002"
        //         },
        //         "trace": "4cad855074654097ac7ba5257c47305d.54.16951844206655589"
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        return this.parseFundingRate(data, market);
    }
    parseFundingRate(contract, market = undefined) {
        //
        //     {
        //         "timestamp": 1695184410697,
        //         "symbol": "BTCUSDT",
        //         "rate_value": "-0.00002614",
        //         "expected_rate": "-0.00002"
        //     }
        //
        const marketId = this.safeString(contract, 'symbol');
        const timestamp = this.safeInteger(contract, 'timestamp');
        return {
            'info': contract,
            'symbol': this.safeSymbol(marketId, market),
            'markPrice': undefined,
            'indexPrice': undefined,
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'fundingRate': this.safeNumber(contract, 'expected_rate'),
            'fundingTimestamp': undefined,
            'fundingDatetime': undefined,
            'nextFundingRate': undefined,
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': this.safeNumber(contract, 'rate_value'),
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
        };
    }
    async fetchPosition(symbol, params = {}) {
        /**
         * @method
         * @name bitmart#fetchPosition
         * @description fetch data on a single open contract trade position
         * @see https://developer-pro.bitmart.com/en/futures/#get-current-position-keyed
         * @param {string} symbol unified market symbol of the market the position is held in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.privateGetContractPrivatePosition(this.extend(request, params));
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": [
        //             {
        //                 "symbol": "BTCUSDT",
        //                 "leverage": "10",
        //                 "timestamp": 1696392515269,
        //                 "current_fee": "0.0014250028",
        //                 "open_timestamp": 1696392256998,
        //                 "current_value": "27.4039",
        //                 "mark_price": "27.4039",
        //                 "position_value": "27.4079",
        //                 "position_cross": "3.75723474",
        //                 "maintenance_margin": "0.1370395",
        //                 "close_vol": "0",
        //                 "close_avg_price": "0",
        //                 "open_avg_price": "27407.9",
        //                 "entry_price": "27407.9",
        //                 "current_amount": "1",
        //                 "unrealized_value": "-0.004",
        //                 "realized_value": "-0.01644474",
        //                 "position_type": 1
        //             }
        //         ],
        //         "trace":"4cad855074664097ac5ba5257c47305d.67.16963925142065945"
        //     }
        //
        const data = this.safeValue(response, 'data', []);
        const first = this.safeValue(data, 0, {});
        return this.parsePosition(first, market);
    }
    async fetchPositions(symbols = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchPositions
         * @description fetch all open contract positions
         * @see https://developer-pro.bitmart.com/en/futures/#get-current-position-keyed
         * @param {string[]|undefined} symbols list of unified market symbols
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [position structures]{@link https://docs.ccxt.com/#/?id=position-structure}
         */
        await this.loadMarkets();
        let market = undefined;
        let symbolsLength = undefined;
        if (symbols !== undefined) {
            symbolsLength = symbols.length;
            const first = this.safeString(symbols, 0);
            market = this.market(first);
        }
        const request = {};
        if (symbolsLength === 1) {
            // only supports symbols as undefined or sending one symbol
            request['symbol'] = market['id'];
        }
        const response = await this.privateGetContractPrivatePosition(this.extend(request, params));
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": [
        //             {
        //                 "symbol": "BTCUSDT",
        //                 "leverage": "10",
        //                 "timestamp": 1696392515269,
        //                 "current_fee": "0.0014250028",
        //                 "open_timestamp": 1696392256998,
        //                 "current_value": "27.4039",
        //                 "mark_price": "27.4039",
        //                 "position_value": "27.4079",
        //                 "position_cross": "3.75723474",
        //                 "maintenance_margin": "0.1370395",
        //                 "close_vol": "0",
        //                 "close_avg_price": "0",
        //                 "open_avg_price": "27407.9",
        //                 "entry_price": "27407.9",
        //                 "current_amount": "1",
        //                 "unrealized_value": "-0.004",
        //                 "realized_value": "-0.01644474",
        //                 "position_type": 1
        //             },
        //         ],
        //         "trace":"4cad855074664097ac5ba5257c47305d.67.16963925142065945"
        //     }
        //
        const positions = this.safeValue(response, 'data', []);
        const result = [];
        for (let i = 0; i < positions.length; i++) {
            result.push(this.parsePosition(positions[i]));
        }
        symbols = this.marketSymbols(symbols);
        return this.filterByArrayPositions(result, 'symbol', symbols, false);
    }
    parsePosition(position, market = undefined) {
        //
        //     {
        //         "symbol": "BTCUSDT",
        //         "leverage": "10",
        //         "timestamp": 1696392515269,
        //         "current_fee": "0.0014250028",
        //         "open_timestamp": 1696392256998,
        //         "current_value": "27.4039",
        //         "mark_price": "27.4039",
        //         "position_value": "27.4079",
        //         "position_cross": "3.75723474",
        //         "maintenance_margin": "0.1370395",
        //         "close_vol": "0",
        //         "close_avg_price": "0",
        //         "open_avg_price": "27407.9",
        //         "entry_price": "27407.9",
        //         "current_amount": "1",
        //         "unrealized_value": "-0.004",
        //         "realized_value": "-0.01644474",
        //         "position_type": 1
        //     }
        //
        const marketId = this.safeString(position, 'symbol');
        market = this.safeMarket(marketId, market);
        const symbol = market['symbol'];
        const timestamp = this.safeInteger(position, 'timestamp');
        const side = this.safeInteger(position, 'position_type');
        const maintenanceMargin = this.safeString(position, 'maintenance_margin');
        const notional = this.safeString(position, 'current_value');
        const collateral = this.safeString(position, 'position_cross');
        const maintenanceMarginPercentage = Precise["default"].stringDiv(maintenanceMargin, notional);
        const marginRatio = Precise["default"].stringDiv(maintenanceMargin, collateral);
        return this.safePosition({
            'info': position,
            'id': undefined,
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastUpdateTimestamp': undefined,
            'hedged': undefined,
            'side': (side === 1) ? 'long' : 'short',
            'contracts': this.safeNumber(position, 'current_amount'),
            'contractSize': this.safeNumber(market, 'contractSize'),
            'entryPrice': this.safeNumber(position, 'entry_price'),
            'markPrice': this.safeNumber(position, 'mark_price'),
            'lastPrice': undefined,
            'notional': this.parseNumber(notional),
            'leverage': this.safeNumber(position, 'leverage'),
            'collateral': this.parseNumber(collateral),
            'initialMargin': undefined,
            'initialMarginPercentage': undefined,
            'maintenanceMargin': this.parseNumber(maintenanceMargin),
            'maintenanceMarginPercentage': this.parseNumber(maintenanceMarginPercentage),
            'unrealizedPnl': this.safeNumber(position, 'unrealized_value'),
            'realizedPnl': this.safeNumber(position, 'realized_value'),
            'liquidationPrice': undefined,
            'marginMode': undefined,
            'percentage': undefined,
            'marginRatio': this.parseNumber(marginRatio),
            'stopLossPrice': undefined,
            'takeProfitPrice': undefined,
        });
    }
    async fetchMyLiquidations(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name bitmart#fetchMyLiquidations
         * @description retrieves the users liquidated positions
         * @see https://developer-pro.bitmart.com/en/futures/#get-order-history-keyed
         * @param {string} symbol unified CCXT market symbol
         * @param {int} [since] the earliest time in ms to fetch liquidations for
         * @param {int} [limit] the maximum number of liquidation structures to retrieve
         * @param {object} [params] exchange specific parameters for the bitmart api endpoint
         * @param {int} [params.until] timestamp in ms of the latest liquidation
         * @returns {object} an array of [liquidation structures]{@link https://docs.ccxt.com/#/?id=liquidation-structure}
         */
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchMyLiquidations() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['swap']) {
            throw new errors.NotSupported(this.id + ' fetchMyLiquidations() supports swap markets only');
        }
        let request = {
            'symbol': market['id'],
        };
        if (since !== undefined) {
            request['start_time'] = since;
        }
        [request, params] = this.handleUntilOption('end_time', request, params);
        const response = await this.privateGetContractPrivateOrderHistory(this.extend(request, params));
        //
        //     {
        //         "code": 1000,
        //         "message": "Ok",
        //         "data": [
        //             {
        //                 "order_id": "231007865458273",
        //                 "client_order_id": "",
        //                 "price": "27407.9",
        //                 "size": "1",
        //                 "symbol": "BTCUSDT",
        //                 "state": 4,
        //                 "side": 3,
        //                 "type": "liquidate",
        //                 "leverage": "10",
        //                 "open_type": "isolated",
        //                 "deal_avg_price": "27422.6",
        //                 "deal_size": "1",
        //                 "create_time": 1696405864011,
        //                 "update_time": 1696405864045
        //             },
        //         ],
        //         "trace": "4cad855074664097ac6ba4257c47305d.71.16965658195443021"
        //     }
        //
        const data = this.safeValue(response, 'data', []);
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const entry = data[i];
            const checkLiquidation = this.safeString(entry, 'type');
            if (checkLiquidation === 'liquidate') {
                result.push(entry);
            }
        }
        return this.parseLiquidations(result, market, since, limit);
    }
    parseLiquidation(liquidation, market = undefined) {
        //
        //     {
        //         "order_id": "231007865458273",
        //         "client_order_id": "",
        //         "price": "27407.9",
        //         "size": "1",
        //         "symbol": "BTCUSDT",
        //         "state": 4,
        //         "side": 3,
        //         "type": "market",
        //         "leverage": "10",
        //         "open_type": "isolated",
        //         "deal_avg_price": "27422.6",
        //         "deal_size": "1",
        //         "create_time": 1696405864011,
        //         "update_time": 1696405864045
        //     }
        //
        const marketId = this.safeString(liquidation, 'symbol');
        const timestamp = this.safeInteger(liquidation, 'update_time');
        const contractsString = this.safeString(liquidation, 'deal_size');
        const contractSizeString = this.safeString(market, 'contractSize');
        const priceString = this.safeString(liquidation, 'deal_avg_price');
        const baseValueString = Precise["default"].stringMul(contractsString, contractSizeString);
        const quoteValueString = Precise["default"].stringMul(baseValueString, priceString);
        return this.safeLiquidation({
            'info': liquidation,
            'symbol': this.safeSymbol(marketId, market),
            'contracts': this.parseNumber(contractsString),
            'contractSize': this.parseNumber(contractSizeString),
            'price': this.parseNumber(priceString),
            'baseValue': this.parseNumber(baseValueString),
            'quoteValue': this.parseNumber(quoteValueString),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
        });
    }
    nonce() {
        return this.milliseconds();
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const baseUrl = this.implodeHostname(this.urls['api']['rest']);
        let url = baseUrl + '/' + this.implodeParams(path, params);
        const query = this.omit(params, this.extractParams(path));
        let queryString = '';
        const getOrDelete = (method === 'GET') || (method === 'DELETE');
        if (getOrDelete) {
            if (Object.keys(query).length) {
                queryString = this.urlencode(query);
                url += '?' + queryString;
            }
        }
        if (api === 'private') {
            this.checkRequiredCredentials();
            const timestamp = this.milliseconds().toString();
            const brokerId = this.safeString(this.options, 'brokerId', 'CCXTxBitmart000');
            headers = {
                'X-BM-KEY': this.apiKey,
                'X-BM-TIMESTAMP': timestamp,
                'X-BM-BROKER-ID': brokerId,
                'Content-Type': 'application/json',
            };
            if (!getOrDelete) {
                body = this.json(query);
                queryString = body;
            }
            const auth = timestamp + '#' + this.uid + '#' + queryString;
            const signature = this.hmac(this.encode(auth), this.encode(this.secret), sha256.sha256);
            headers['X-BM-SIGN'] = signature;
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined;
        }
        //
        // spot
        //
        //     {"message":"Bad Request [to is empty]","code":50000,"trace":"f9d46e1b-4edb-4d07-a06e-4895fb2fc8fc","data":{}}
        //     {"message":"Bad Request [from is empty]","code":50000,"trace":"579986f7-c93a-4559-926b-06ba9fa79d76","data":{}}
        //     {"message":"Kline size over 500","code":50004,"trace":"d625caa8-e8ca-4bd2-b77c-958776965819","data":{}}
        //     {"message":"Balance not enough","code":50020,"trace":"7c709d6a-3292-462c-98c5-32362540aeef","data":{}}
        //
        // contract
        //
        //     {"errno":"OK","message":"INVALID_PARAMETER","code":49998,"trace":"eb5ebb54-23cd-4de2-9064-e090b6c3b2e3","data":null}
        //
        const message = this.safeStringLower(response, 'message');
        const isErrorMessage = (message !== undefined) && (message !== 'ok') && (message !== 'success');
        const errorCode = this.safeString(response, 'code');
        const isErrorCode = (errorCode !== undefined) && (errorCode !== '1000');
        if (isErrorCode || isErrorMessage) {
            const feedback = this.id + ' ' + body;
            this.throwExactlyMatchedException(this.exceptions['exact'], errorCode, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], errorCode, feedback);
            this.throwExactlyMatchedException(this.exceptions['exact'], message, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
            throw new errors.ExchangeError(feedback); // unknown message
        }
        return undefined;
    }
}

module.exports = bitmart;
