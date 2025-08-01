'use client'

import { ReactNode } from "react";

export interface Chain {
  chain_id: number;
  chain_name: string;
}


export interface User {
  user_id: number;
  display_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface Vendor {
  vendor_id: number;
  vendor_name: string;
  chain_id: number;
  longitude: number;
  latitude: number;
  created_at?: string;
}

export interface MenuItem {
  key: string;
  title: string;
  icon: ReactNode;
  description: string;
}

export interface VendorWithChainName extends Vendor {
  chain_name: string;
}

export interface UserVendor {
  vendor_id: number;
  vendor_name: string;
}

export interface UserWithVendors extends User {
  vendors: UserVendor[];
}



// Backend request body type for user updates

// PUT
export interface RequestBody  {
  email: string;
  display_name?: string;
  is_active: boolean;
  vendor_ids: number[];
};