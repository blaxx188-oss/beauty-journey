import { ADMIN_MOCK_PRODUCTS } from "@/data/admin-mock-data";

export const productAdminService = {
  getProducts: async () => {
    // In a real app, this would call Supabase
    return ADMIN_MOCK_PRODUCTS;
  },
  getProductById: async (id: string) => {
    return ADMIN_MOCK_PRODUCTS.find((p) => p.id === id);
  },
  createProduct: async (data: any) => {
    console.log("Creating product:", data);
    return { success: true };
  },
  updateProduct: async (id: string, data: any) => {
    console.log("Updating product:", id, data);
    return { success: true };
  },
  deleteProduct: async (id: string) => {
    console.log("Deleting product:", id);
    return { success: true };
  },
};
