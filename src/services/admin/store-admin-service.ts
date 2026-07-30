import { 
  ADMIN_MOCK_MESSAGES, 
  ADMIN_MOCK_SUBSCRIBERS, 
  ADMIN_MOCK_AUDIT_LOGS, 
  ADMIN_MOCK_REVENUE_DATA 
} from "@/data/admin-mock-data";

export const storeAdminService = {
  getMessages: async () => {
    return ADMIN_MOCK_MESSAGES;
  },
  getSubscribers: async () => {
    return ADMIN_MOCK_SUBSCRIBERS;
  },
  getAuditLogs: async () => {
    return ADMIN_MOCK_AUDIT_LOGS;
  },
  getRevenueData: async () => {
    return ADMIN_MOCK_REVENUE_DATA;
  },
  getStoreSettings: async () => {
    return {
      storeName: "Beauty Journey",
      supportEmail: "support@beautyjourney.com",
      baseUrl: "https://beautyjourney.com",
      currency: "EGP",
      taxRate: 14,
      shippingFlatRate: 50,
      freeShippingThreshold: 1000,
    };
  },
  updateStoreSettings: async (settings: any) => {
    console.log("Updating store settings:", settings);
    return { success: true };
  }
};
