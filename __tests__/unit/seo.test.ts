import { describe, it, expect } from "vitest";
import { generatePageMetadata } from "@/utils/seo";

describe("SEO Utility", () => {
  it("should generate correct metadata with default values", () => {
    const metadata = generatePageMetadata({
      title: "Test Title",
      description: "Test Description",
    });

    expect(metadata.title).toBe("Test Title");
    expect(metadata.description).toBe("Test Description");
    expect(metadata.openGraph?.title).toBe("Test Title");
    expect((metadata.twitter as any)?.card).toBe("summary_large_image");
  });

  it("should handle custom path and image", () => {
    const metadata = generatePageMetadata({
      title: "Test Title",
      description: "Test Description",
      path: "/custom-path",
      image: "/custom-image.jpg",
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://beauty-journey.com";
    expect(metadata.alternates?.canonical).toBe(`${baseUrl}/custom-path`);
    expect(metadata.openGraph?.images).toContainEqual(
      expect.objectContaining({ url: `${baseUrl}/custom-image.jpg` })
    );
  });

  it("should respect noIndex flag", () => {
    const metadata = generatePageMetadata({
      title: "Private Page",
      description: "No index",
      noIndex: true,
    });

    expect(metadata.robots).toEqual(
      expect.objectContaining({
        index: false,
        follow: false,
      })
    );
  });
});
