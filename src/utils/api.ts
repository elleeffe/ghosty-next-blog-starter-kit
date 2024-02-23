import fs from 'fs';
import matter from 'gray-matter';
import {join} from 'path';
import {categories} from '../config';

const postsDirectory = join(process.cwd(), '_posts');

export function getAllPostsSlugs(lng: Language): Record<Category, string[]> {
  const slugs = categories.reduce<Record<Category, string[]> | undefined>(
    (acc, curr) => {
      try {
        const posts = fs.readdirSync(`${postsDirectory}/${lng}/${curr}`);
        if (acc === undefined) {
          acc = {
            [curr]: posts,
          };
        } else {
          acc[curr] = posts;
        }
        return acc;
      } catch (e) {
        console.log(e);
        throw new Error(`getAllPostsSlugs error. category: ${curr}`);
      }
    },
    undefined
  );

  if (slugs === undefined) {
    throw new Error(`getAllPostsSlugs error. Can't generate slugs`);
  }

  return slugs;
}

export function getPostBySlug(slug: string): Post {
  const fileContents = fs.readFileSync(postsDirectory + slug + '.md', 'utf8');
  const {data, content} = matter(fileContents);

  return {...data, slug: slug.replace(/.md/g, ''), content} as Post;
}

export function getAllPosts(lng: Language): Post[] {
  const slugs = getAllPostsSlugs(lng);

  const allPosts = Object.entries(slugs)
    .map(([cat, posts]) =>
      posts.map((post) => `/${lng}/${cat}/${post.replace(/.md/g, '')}`)
    )
    .flat();

  const posts = allPosts
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getAllPostsByCategory(
  lng: Language,
  category: Category
): Post[] {
  try {
    const posts = fs.readdirSync(`${postsDirectory}/${lng}/${category}`);
    return (
      posts
        .map((slug) =>
          getPostBySlug(`/${lng}/${category}/${slug.replace(/.md/g, '')}`)
        )
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    );
  } catch (e) {
    console.log(e);
    throw new Error(`getAllPostsByCategory error. category: ${category}`);
  }
}
