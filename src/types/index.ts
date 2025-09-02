import type { ComponentType } from "react";




export type TRole = 'ADMIN' | 'AGENT' | 'USER';

export interface ISidebar {
    items: {
        title: string,
        url: string,
        component: ComponentType;
    }[]
};