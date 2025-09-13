import type { ComponentType } from "react";


export type TRole = 'ADMIN' | 'AGENT' | 'USER';

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    isDeleted?: boolean;
    isActive?: string;
    isApproved?: string;
    role: TRole;
    wallet?: string;
    createdAt: string;
    updatedAt: string;
}


export interface ISidebar {
    items: {
        title: string,
        url: string,
        component: ComponentType;
    }[]
};

export interface ITransaction {
    _id: string;
    sender: IUser;
    receiver: IUser;
    type: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}