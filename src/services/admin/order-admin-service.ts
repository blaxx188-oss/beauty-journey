import { ADMIN_MOCK_ORDERS } from "@/data/admin-mock-data";
import { AdminOrder } from "@/types/admin";

export const orderAdminService = {
  getOrders: async () => {
    return ADMIN_MOCK_ORDERS as unknown as AdminOrder[];
  },
  getOrderById: async (id: string) => {
    return (ADMIN_MOCK_ORDERS.find((o) => o.id === id) as unknown as AdminOrder) || null;
  },
  updateOrderStatus: async (id: string, status: string) => {
    // console.log(`Updating order ${id} status to ${status}`);
    return { success: true };
  },
  updatePaymentStatus: async (id: string, status: string) => {
    // console.log(`Updating order ${id} payment status to ${status}`);
    return { success: true };
  },
  addOrderNote: async (id: string, note: string) => {
    // console.log(`Adding note to order ${id}: ${note}`);
    return { success: true };
  },
  refundOrder: async (id: string, amount?: number) => {
    // console.log(`Refunding order ${id}, amount: ${amount || "full"}`);
    return { success: true };
  }
};
