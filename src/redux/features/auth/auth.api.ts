import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo
            }),
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo
            }),
        }),
        userInfo: builder.query({
            query: () => ({
                url: '/user/me',
                method: 'GET'
            }),
            providesTags: ["USER"],
            transformResponse: (res) => res.data
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            invalidatesTags: ['USER']
        }),
        updateUserInfo: builder.mutation({
            query: (updatedInfo) => ({
                url: `/user/${updatedInfo?.id}`,
                method: 'PATCH',
                data: updatedInfo?.data
            }),
            invalidatesTags: ['USER']
        }),
        updatePassword: builder.mutation({
            query: (updatedInfo) => ({
                url: `/user/change-password/${updatedInfo?.id}`,
                method: 'PATCH',
                data: updatedInfo?.data
            }),
            invalidatesTags: ['USER']
        }),
        blockUnblockUser: builder.mutation({
            query: (id) => ({
                url: `/user/block-unblock/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['USER']
        }),
        approveSuspendAgent: builder.mutation({
            query: (id) => ({
                url: `/user/approve-suspend/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['USER']
        }),
        allUser: builder.query({
            query: (query) => ({
                url: '/user',
                method: 'GET',
                params: query
            }),
            providesTags: ["USER"]
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useUserInfoQuery, useLogoutMutation, useUpdateUserInfoMutation, useUpdatePasswordMutation, useBlockUnblockUserMutation, useApproveSuspendAgentMutation ,useAllUserQuery } = authApi;