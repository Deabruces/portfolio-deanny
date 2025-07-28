import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";


const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: ({image})=>z.object({
        title: z.string(),
        image: image(),
        summary: z.string(),
        date: z.string(),
        tags: z.array(z.string()).optional(),
        starred: z.boolean().optional(),
    })
})



const quotes = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/quotes' }),
    schema: z.object({
        quote: z.string(),
        author: z.string(),
    })
})

export const collections = { projects , quotes };
