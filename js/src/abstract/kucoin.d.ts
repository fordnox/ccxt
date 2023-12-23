import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
interface Exchange {
    publicGetCurrencies(params?: {}): Promise<implicitReturnType>;
    publicGetCurrenciesCurrency(params?: {}): Promise<implicitReturnType>;
    publicGetSymbols(params?: {}): Promise<implicitReturnType>;
    publicGetMarketOrderbookLevel1(params?: {}): Promise<implicitReturnType>;
    publicGetMarketAllTickers(params?: {}): Promise<implicitReturnType>;
    publicGetMarketStats(params?: {}): Promise<implicitReturnType>;
    publicGetMarkets(params?: {}): Promise<implicitReturnType>;
    publicGetMarketOrderbookLevelLevelLimit(params?: {}): Promise<implicitReturnType>;
    publicGetMarketOrderbookLevel220(params?: {}): Promise<implicitReturnType>;
    publicGetMarketOrderbookLevel2100(params?: {}): Promise<implicitReturnType>;
    publicGetMarketHistories(params?: {}): Promise<implicitReturnType>;
    publicGetMarketCandles(params?: {}): Promise<implicitReturnType>;
    publicGetPrices(params?: {}): Promise<implicitReturnType>;
    publicGetTimestamp(params?: {}): Promise<implicitReturnType>;
    publicGetStatus(params?: {}): Promise<implicitReturnType>;
    publicGetMarkPriceSymbolCurrent(params?: {}): Promise<implicitReturnType>;
    publicGetMarginConfig(params?: {}): Promise<implicitReturnType>;
    publicPostBulletPublic(params?: {}): Promise<implicitReturnType>;
    privateGetUserInfo(params?: {}): Promise<implicitReturnType>;
    privateGetAccounts(params?: {}): Promise<implicitReturnType>;
    privateGetAccountsAccountId(params?: {}): Promise<implicitReturnType>;
    privateGetAccountsLedgers(params?: {}): Promise<implicitReturnType>;
    privateGetHfAccountsLedgers(params?: {}): Promise<implicitReturnType>;
    privateGetHfMarginAccountLedgers(params?: {}): Promise<implicitReturnType>;
    privateGetTransactionHistory(params?: {}): Promise<implicitReturnType>;
    privateGetSubUser(params?: {}): Promise<implicitReturnType>;
    privateGetSubAccountsSubUserId(params?: {}): Promise<implicitReturnType>;
    privateGetSubAccounts(params?: {}): Promise<implicitReturnType>;
    privateGetSubApiKey(params?: {}): Promise<implicitReturnType>;
    privateGetMarginAccount(params?: {}): Promise<implicitReturnType>;
    privateGetMarginAccounts(params?: {}): Promise<implicitReturnType>;
    privateGetIsolatedAccounts(params?: {}): Promise<implicitReturnType>;
    privateGetDepositAddresses(params?: {}): Promise<implicitReturnType>;
    privateGetDeposits(params?: {}): Promise<implicitReturnType>;
    privateGetHistDeposits(params?: {}): Promise<implicitReturnType>;
    privateGetWithdrawals(params?: {}): Promise<implicitReturnType>;
    privateGetHistWithdrawals(params?: {}): Promise<implicitReturnType>;
    privateGetWithdrawalsQuotas(params?: {}): Promise<implicitReturnType>;
    privateGetAccountsTransferable(params?: {}): Promise<implicitReturnType>;
    privateGetTransferList(params?: {}): Promise<implicitReturnType>;
    privateGetBaseFee(params?: {}): Promise<implicitReturnType>;
    privateGetTradeFees(params?: {}): Promise<implicitReturnType>;
    privateGetMarketOrderbookLevelLevel(params?: {}): Promise<implicitReturnType>;
    privateGetMarketOrderbookLevel2(params?: {}): Promise<implicitReturnType>;
    privateGetMarketOrderbookLevel3(params?: {}): Promise<implicitReturnType>;
    privateGetHfOrdersActive(params?: {}): Promise<implicitReturnType>;
    privateGetHfOrdersActiveSymbols(params?: {}): Promise<implicitReturnType>;
    privateGetHfOrdersDone(params?: {}): Promise<implicitReturnType>;
    privateGetHfOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    privateGetHfOrdersClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateGetHfOrdersDeadCancelAllQuery(params?: {}): Promise<implicitReturnType>;
    privateGetHfFills(params?: {}): Promise<implicitReturnType>;
    privateGetOrders(params?: {}): Promise<implicitReturnType>;
    privateGetLimitOrders(params?: {}): Promise<implicitReturnType>;
    privateGetOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    privateGetOrderClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateGetFills(params?: {}): Promise<implicitReturnType>;
    privateGetLimitFills(params?: {}): Promise<implicitReturnType>;
    privateGetStopOrder(params?: {}): Promise<implicitReturnType>;
    privateGetStopOrderOrderId(params?: {}): Promise<implicitReturnType>;
    privateGetStopOrderQueryOrderByClientOid(params?: {}): Promise<implicitReturnType>;
    privateGetOcoOrderOrderId(params?: {}): Promise<implicitReturnType>;
    privateGetOcoOrderDetailsOrderId(params?: {}): Promise<implicitReturnType>;
    privateGetOcoClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateGetOcoOrders(params?: {}): Promise<implicitReturnType>;
    privateGetHfMarginOrdersActive(params?: {}): Promise<implicitReturnType>;
    privateGetHfMarginOrdersDone(params?: {}): Promise<implicitReturnType>;
    privateGetHfMarginOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    privateGetHfMarginOrdersClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateGetHfMarginFills(params?: {}): Promise<implicitReturnType>;
    privateGetEtfInfo(params?: {}): Promise<implicitReturnType>;
    privateGetMarginCurrencies(params?: {}): Promise<implicitReturnType>;
    privateGetRiskLimitStrategy(params?: {}): Promise<implicitReturnType>;
    privateGetIsolatedSymbols(params?: {}): Promise<implicitReturnType>;
    privateGetIsolatedAccountSymbol(params?: {}): Promise<implicitReturnType>;
    privateGetMarginBorrow(params?: {}): Promise<implicitReturnType>;
    privateGetMarginRepay(params?: {}): Promise<implicitReturnType>;
    privateGetProjectList(params?: {}): Promise<implicitReturnType>;
    privateGetProjectMarketInterestRate(params?: {}): Promise<implicitReturnType>;
    privateGetRedeemOrders(params?: {}): Promise<implicitReturnType>;
    privateGetPurchaseOrders(params?: {}): Promise<implicitReturnType>;
    privatePostSubUserCreated(params?: {}): Promise<implicitReturnType>;
    privatePostSubApiKey(params?: {}): Promise<implicitReturnType>;
    privatePostSubApiKeyUpdate(params?: {}): Promise<implicitReturnType>;
    privatePostDepositAddresses(params?: {}): Promise<implicitReturnType>;
    privatePostWithdrawals(params?: {}): Promise<implicitReturnType>;
    privatePostAccountsUniversalTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostAccountsSubTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostAccountsInnerTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostTransferOut(params?: {}): Promise<implicitReturnType>;
    privatePostTransferIn(params?: {}): Promise<implicitReturnType>;
    privatePostHfOrders(params?: {}): Promise<implicitReturnType>;
    privatePostHfOrdersTest(params?: {}): Promise<implicitReturnType>;
    privatePostHfOrdersSync(params?: {}): Promise<implicitReturnType>;
    privatePostHfOrdersMulti(params?: {}): Promise<implicitReturnType>;
    privatePostHfOrdersMultiSync(params?: {}): Promise<implicitReturnType>;
    privatePostHfOrdersAlter(params?: {}): Promise<implicitReturnType>;
    privatePostHfOrdersDeadCancelAll(params?: {}): Promise<implicitReturnType>;
    privatePostOrders(params?: {}): Promise<implicitReturnType>;
    privatePostOrdersTest(params?: {}): Promise<implicitReturnType>;
    privatePostOrdersMulti(params?: {}): Promise<implicitReturnType>;
    privatePostStopOrder(params?: {}): Promise<implicitReturnType>;
    privatePostOcoOrder(params?: {}): Promise<implicitReturnType>;
    privatePostHfMarginOrder(params?: {}): Promise<implicitReturnType>;
    privatePostHfMarginOrderTest(params?: {}): Promise<implicitReturnType>;
    privatePostMarginOrder(params?: {}): Promise<implicitReturnType>;
    privatePostMarginOrderTest(params?: {}): Promise<implicitReturnType>;
    privatePostMarginBorrow(params?: {}): Promise<implicitReturnType>;
    privatePostMarginRepay(params?: {}): Promise<implicitReturnType>;
    privatePostPurchase(params?: {}): Promise<implicitReturnType>;
    privatePostRedeem(params?: {}): Promise<implicitReturnType>;
    privatePostLendPurchaseUpdate(params?: {}): Promise<implicitReturnType>;
    privatePostBulletPrivate(params?: {}): Promise<implicitReturnType>;
    privateDeleteSubApiKey(params?: {}): Promise<implicitReturnType>;
    privateDeleteWithdrawalsWithdrawalId(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfOrdersSyncOrderId(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfOrdersClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfOrdersSyncClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfOrdersCancelOrderId(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfOrders(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfOrdersCancelAll(params?: {}): Promise<implicitReturnType>;
    privateDeleteOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    privateDeleteOrderClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateDeleteOrders(params?: {}): Promise<implicitReturnType>;
    privateDeleteStopOrderOrderId(params?: {}): Promise<implicitReturnType>;
    privateDeleteStopOrderCancelOrderByClientOid(params?: {}): Promise<implicitReturnType>;
    privateDeleteStopOrderCancel(params?: {}): Promise<implicitReturnType>;
    privateDeleteOcoOrderOrderId(params?: {}): Promise<implicitReturnType>;
    privateDeleteOcoClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateDeleteOcoOrders(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfMarginOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfMarginOrdersClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    privateDeleteHfMarginOrders(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetContractsActive(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetContractsSymbol(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetTicker(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetLevel2Snapshot(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetLevel2Depth20(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetLevel2Depth100(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetTradeHistory(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetKlineQuery(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetInterestQuery(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetIndexQuery(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetMarkPriceSymbolCurrent(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetPremiumQuery(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetTradeStatistics(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetFundingRateSymbolCurrent(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetTimestamp(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetStatus(params?: {}): Promise<implicitReturnType>;
    futuresPublicGetLevel2MessageQuery(params?: {}): Promise<implicitReturnType>;
    futuresPublicPostBulletPublic(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetTransactionHistory(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetAccountOverview(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetAccountOverviewAll(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetTransferList(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetOrders(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetStopOrders(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetRecentDoneOrders(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetOrdersByClientOid(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetFills(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetRecentFills(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetOpenOrderStatistics(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetPosition(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetPositions(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetContractsRiskLimitSymbol(params?: {}): Promise<implicitReturnType>;
    futuresPrivateGetFundingHistory(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostTransferOut(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostTransferIn(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostOrders(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostOrdersTest(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostPositionMarginAutoDepositStatus(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostPositionMarginDepositMargin(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostPositionRiskLimitLevelChange(params?: {}): Promise<implicitReturnType>;
    futuresPrivatePostBulletPrivate(params?: {}): Promise<implicitReturnType>;
    futuresPrivateDeleteOrdersOrderId(params?: {}): Promise<implicitReturnType>;
    futuresPrivateDeleteOrdersClientOrderClientOid(params?: {}): Promise<implicitReturnType>;
    futuresPrivateDeleteOrders(params?: {}): Promise<implicitReturnType>;
    futuresPrivateDeleteStopOrders(params?: {}): Promise<implicitReturnType>;
    webExchangeGetCurrencyCurrencyChainInfo(params?: {}): Promise<implicitReturnType>;
}
declare abstract class Exchange extends _Exchange {
}
export default Exchange;
