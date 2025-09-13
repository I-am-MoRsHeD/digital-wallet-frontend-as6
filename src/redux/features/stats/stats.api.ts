import { baseApi } from "@/redux/baseApi";


export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        agentTransactionOverview: builder.query({
            query: () => ({
                url: '/stats/agent',
                method: 'GET'
            }),
            providesTags: ["WALLET", "TRANSACTION"],
            transformResponse: (response) => response.data
        }),
        adminStats: builder.query({
            query: () => ({
                url: '/stats/admin',
                method: 'GET'
            }),
            providesTags: ["WALLET", "TRANSACTION"],
            transformResponse: (response) => response.data
        }),
    }),
});

export const { useAgentTransactionOverviewQuery, useAdminStatsQuery } = statsApi;