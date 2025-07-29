import { VendorWithChainName } from "@/app/utils/types";

export const vendors: (VendorWithChainName & { created_at: string })[] = [
	{
		vendor_id: 1,
		vendor_name: "The Healthy Brand - Business Bay",
		chain_id: 1,
		longitude: 55.279824,
		latitude: 25.219511,
		chain_name: "The Healthy Brand",
		created_at: "2025-07-01T08:00:00Z",
	},
	{
		vendor_id: 2,
		vendor_name: "The Healthy Brand - Downtown",
		chain_id: 1,
		longitude: 55.2798,
		latitude: 25.21992,
		chain_name: "The Healthy Brand",
		created_at: "2025-06-01T08:10:00Z",
	},
	{
		vendor_id: 3,
		vendor_name: "Tasty Burgers - Business Bay",
		chain_id: 2,
		longitude: 55.159214,
		latitude: 25.0941429,
		chain_name: "Tasty Burgers",
		created_at: "2025-05-01T08:20:00Z",
	},
	{
		vendor_id: 4,
		vendor_name: "The Pizza House - Business Bay",
		chain_id: 3,
		longitude: 55.1592144,
		latitude: 25.0941431,
		chain_name: "The Pizza House",
		created_at: "2025-04-01T08:30:00Z",
	},
];
