import { baseApi } from "@/redux/baseApi";


export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        depositInfo: builder.query({
            query: () => ({
                url: '/transactions/cash-in',
                method: 'GET'
            }),
            providesTags: ["WALLET", "TRANSACTION"]
        }),
        cashOutInfo: builder.query({
            query: () => ({
                url: '/transactions/withdraw',
                method: 'GET'
            }),
            providesTags: ["WALLET", "TRANSACTION"]
        }),
        allTransactions: builder.query({
            query: (query) => ({
                url: '/transactions/me',
                method: 'GET',
                params: query
            }),
            providesTags: ["WALLET", "TRANSACTION"]
        }),
    }),
});

export const { useDepositInfoQuery, useCashOutInfoQuery, useAllTransactionsQuery } = transactionApi;