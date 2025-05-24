import { MetadataRoute } from "next";
import { categories } from "../data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://emojiguessgame.com";

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    });
  });

  return routes;
}
