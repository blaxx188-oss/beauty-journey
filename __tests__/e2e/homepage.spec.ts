import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the main hero heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("رحلتك الجمالية تبدأ هنا");
  });

  test("should navigate to products page via CTA", async ({ page }) => {
    await page.click('text="استكشفي المنتجات"');
    await expect(page).toHaveURL(/\/products/);
  });

  test("should open the search overlay", async ({ page }) => {
    await page.click('aria-label="Search"');
    await expect(page.locator('input[placeholder*="بحث"]')).toBeVisible();
  });

  test("should toggle the mobile menu", async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.click('aria-label="Open menu"');
    await expect(page.locator('nav >> text="الأقسام"')).toBeVisible();
    
    await page.click('aria-label="Close menu"');
    await expect(page.locator('nav >> text="الأقسام"')).not.toBeVisible();
  });
});
