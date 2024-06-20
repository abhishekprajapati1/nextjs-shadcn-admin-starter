import * as React from 'react';


export interface IWrapper {
    children: React.ReactNode;
}

export type FileType = {
    id: string;
    name?: string;
    fieldname?: string;
    url: string;
}

export interface IconInterface extends React.SVGProps<SVGSVGElement> { }
export interface IOwner {
    id: string,
    name: string,
    created_at: Date,
    account_verified: Date | null,
    email: string,
    email_verified: Date | null,
    phone_number: string,
    company_name: string,
    avatar: FileType,
}
export interface IFormOption {
    id: string,
    type: string,
    label: string,
    xero_key?: string | null,
    myob_key?: string | null,
    _count: { [key: string]: number }
}