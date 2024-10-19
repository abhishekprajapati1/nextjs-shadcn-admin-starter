import * as React from "react";

export interface IRecordMeta {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ISearchTerm {
  query: string;
  query_string: string;
}

export interface IDefaultUrl {
  default_url?: string;
}
export interface IWrapper {
  children: React.ReactNode;
}

export interface IDeleteRecord {
  id: string;
  label: string;
}

export type FileType = {
  id: string;
  key?: string;
  fieldname?: string;
  url: string;
};

export interface IconInterface extends React.SVGProps<SVGSVGElement> {}
export interface IOwner {
  id: string;
  name: string;
  created_at: Date;
  account_verified: Date | null;
  email: string;
  email_verified: Date | null;
  phone_number: string;
  company_name: string;
  avatar: FileType;
}
export interface IFormOption {
  id: string;
  type: string;
  label: string;
  xero_key?: string;
  myob_key?: string;
  _count: { [key: string]: number };
}
