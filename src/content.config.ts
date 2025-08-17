import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const categories = defineCollection({

    loader: file("./src/content/categories.json"),
    schema: z.object({
        id: z.string(),
        name: z.string(),
        color: z.string()
    }) 
})

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

const posts = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
    schema: ({image})=>z.object({
        title: z.string(),
        image: image(),
        summary: z.string(),
        categories: z.array(reference("categories")),
        date: z.string(),
    })
})



export const collections = { projects , posts, categories };
