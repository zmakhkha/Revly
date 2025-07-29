import { UserWithVendors } from "@/app/utils/types";

export const users: UserWithVendors[] = [
  {
    user_id: 1,
    display_name: "John Doe",
    email: "john.doe@mail.com",
    is_active: true,
    created_at: "2024-11-12",
    vendors: [
      { vendor_id: 1, vendor_name: "The Healthy Brand - Business Bay" },
      { vendor_id: 2, vendor_name: "The Healthy Brand - Downtown" },
    ],
  },
  {
    user_id: 2,
    display_name: "Natasha Smith",
    email: "natasha.smith@mail.com",
    is_active: true,
    created_at: "2024-12-05",
    vendors: [
      { vendor_id: 3, vendor_name: "Tasty Burgers - Business Bay" },
    ],
  },
];
