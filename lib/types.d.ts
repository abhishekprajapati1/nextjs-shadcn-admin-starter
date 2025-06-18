import { IColor } from "@/components/colors/ListItem";
import { IProductFile } from "@/components/products/details/product-color-images/ColorImages";
import { LucideProps } from "lucide-react";
import * as React from "react";
import { FrameStyle } from "./validations/admin/product.validation";

export type IconElement = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export interface IPaginatedResponse<T> {
  data: T[];
  success: boolean;
  total: number;
  page: number;
  page_size: number;
}

export interface IRecordMeta {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface IFile {
  id: string;
  url: string;
  fieldname: string;
  is_temp?: boolean;
}

export interface IUser {
  name: string;
  email: string;
  phone_number: string;
  avatar?: IFile;
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

export interface IDeleteRecord<T = any> {
  id: string;
  label: string;
  data?: T;
}

export type FileType = {
  id: string;
  key?: string;
  fieldname?: string;
  url: string;
};

export interface InputOption {
  value?: string;
  label?: string;
}

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

export interface ISidebarBrand {
  name: string;
  logo: React.ElementType;
  website: {
    url: string;
    label: string;
  };
}

export interface SubMenuItem {
  icon?: IconElement;
  title: string;
  url: string;
  isActive?: boolean;
}
export interface MenuItem {
  title: string;
  url: string;
  icon: IconElement;
  isActive?: boolean;
  items?: SubMenuItem[];
}
export interface IProductColor extends IRecordMeta {
  colors: IColor[];
  product_id: string;
  model_number: string;
  stock_quantity: number;
  images: IProductFile[];
}
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  product_colors: IProductColor[];
}

export interface IGlasses {
  src: string;
  title: string;
}

export interface IGlassTypeData {
  src: string;
  title: string;
}

export interface IProductStarter {
  title: string;
  slug: string;
  products: {
    price: number;
    listing_price: number;
    discount_percent: number;
    product_colors: { images: IFile[] }[];
  }[];
}

export interface ISeparatedProduct extends IRecordMeta {
  model_number: string;
  stock_quantity: number;
  color_ids: string[];
  product_id: string;
  product: {
    frame_size: string[];
    frame_style: keyof typeof FrameStyle;
    slug: string;
    price: number;
    model_name: string;
    listing_price: number;
    is_featured: boolean;
    lens_width: number;
    lens_height: number;
    gender: string;
    popularity: number;
    discount_percent: number;
  };
  colors: IColor[];
  images: IProductFile[];
}
