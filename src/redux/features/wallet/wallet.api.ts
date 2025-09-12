import { baseApi } from "@/redux/baseApi";


export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        withdraw: builder.mutation({
            query: (withdrawInfo) => ({
                url: '/wallets/user/withdraw',
                method: 'POST',
                data: withdrawInfo
            }),
            invalidatesTags: ["WALLET"]
        }),
        sendMoney: builder.mutation({
            query: (sendMoneyInfo) => ({
                url: '/wallets/user/send-money',
                method: 'POST',
                data: sendMoneyInfo
            }),
            invalidatesTags: ["WALLET", "TRANSACTION"]
        }),
        cashIn: builder.mutation({
            query: (cashInInfo) => ({
                url: '/wallets/agent/cash-in',
                method: 'POST',
                data: cashInInfo
            }),
            invalidatesTags: ["WALLET", "TRANSACTION"]
        }),
        walletInfo: builder.query({
            query: () => ({
                url: '/wallets/me',
                method: 'GET'
            }),
            providesTags: ["WALLET"],
            transformResponse: (res) => res?.data
        }),
    }),
});

export const { useWithdrawMutation, useSendMoneyMutation, useCashInMutation ,useWalletInfoQuery } = walletApi;