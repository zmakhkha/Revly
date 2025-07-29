export interface Chain {
  chain_id: number;
  chain_name: string;
}

export interface User {
  user_id: number;
  display_name: string;
  email: string;
  is_active: boolean;
}

export interface Vendor {
  vendor_id: number;
  vendor_name: string;
  chain_id: number;
  longitude: number;
  latitude: number;
}
