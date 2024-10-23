import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders'; // Not available with legacy API

const verbs = defineCollection({
  loader: glob({ pattern: "**\/*.json", base: "./src/scraper/data/verbs" }),
});

export const collections = { verbs };