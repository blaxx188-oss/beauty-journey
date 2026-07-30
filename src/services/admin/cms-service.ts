import { 
  ADMIN_MOCK_CATEGORIES, 
  ADMIN_MOCK_BRANDS, 
  ADMIN_MOCK_COUPONS, 
  ADMIN_MOCK_PAGES 
} from "@/data/admin-mock-data";

export const cmsService = {
  getCategories: async () => ADMIN_MOCK_CATEGORIES,
  getBrands: async () => ADMIN_MOCK_BRANDS,
  getCoupons: async () => ADMIN_MOCK_COUPONS,
  getPages: async () => ADMIN_MOCK_PAGES,
  
  updateHomepageSection: async (sectionId: string, data: any) => {
    console.log("Updating homepage section:", sectionId, data);
    return { success: true };
  },
};
