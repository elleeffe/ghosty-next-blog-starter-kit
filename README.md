![Ghosty Logo](https://github.com/elleeffe/ghosty-next-blog-starter-kit/blob/main/ghosty-logo.webp?raw=true)

# A statically generated blog example using Next.js, Markdown, TypeScript, internationalization, and a pre-commit hook for dynamic sitemap generation.

This is the existing [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) 
plus TypeScript, [internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization), and [Husky](https://github.com/typicode/husky).

## Features
- **Static Generation:** Utilizes Next.js's Static Generation feature with Markdown files as the data source.
- **Internationalization (i18n):** Supports multiple languages for content localization.
- **Husky Integration:** Incorporates Husky for pre-commit hook automation (sitemap generation).

## Blog Structure
Blog posts are stored in the `/_posts` directory as Markdown files with front matter support. 
Each Markdown file represents a blog post. It's crucial to maintain the following folder structure:

The name of each Markdown file becomes the post's path, for example: `title-of-the-post.md`.

## Important!!!
- ### Respect the folder structure:
/_posts/(lang)/(category)/(title-of-the-post).md
- ### Every post should be present in every category and every category in every language
- ### If you add a new category or language folder, update Category and Language types in /src/types.d.ts.
- ### Each Markdown file should contain the following front matter in the header:
```yaml
---
title: "Title of the Post"
excerpt: "Excerpt of the Post"
coverImage: "/assets/blog/title-of-the-post/cover.jpg"
date: "2024-02-27"
author:
  name: Author
  picture: "/assets/blog/title-of-the-post/author.jpeg"
ogImage: "/assets/blog/title-of-the-post/cover.jpg"
category: "news"
---

...include the markdown post content after the front matter.
```

## Pre-Commit Hook
Upon adding/editing/deleting a Markdown file and attempting to commit changes, Husky triggers an sh script (/backend/pre-commit-sh) that generates a new sitemap in the /public folder and automatically adds it to the commit.

### Now just push and deploy it

## Run project
```yaml
pnpm i
```

then

```yaml
pnpm run dev
```

or
```yaml
pnpm run build && pnpm run start
```
