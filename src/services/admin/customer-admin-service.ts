import { ADMIN_MOCK_CUSTOMERS } from "@/data/admin-mock-data";
import { AdminCustomer } from "@/types/admin";

export const customerAdminService = {
  getCustomers: async () => {
    return ADMIN_MOCK_CUSTOMERS as unknown as AdminCustomer[];
  },
  getCustomerById: async (id: string) => {
    return (ADMIN_MOCK_CUSTOMERS.find((c) => c.id === id) as unknown as AdminCustomer) || null;
  },
  updateCustomerStatus: async (id: string, status: "active" | "blocked") => {
    // console.log(`Updating customer ${id} status to ${status}`);
    return { success: true };
  },
  addCustomerNote: async (id: string, note: string) => {
    // console.log(`Adding note to customer ${id}: ${note}`);
    return { success: true };
  }
};
