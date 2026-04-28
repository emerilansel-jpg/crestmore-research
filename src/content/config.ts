import { defineCollection, z } from 'astro:content';

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    featured_image: z.string().optional(),
  }),
});

export const collections = { research };
