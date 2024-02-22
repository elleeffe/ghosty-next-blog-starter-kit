import {getAllPosts} from '@/utils/api';
import {categories} from '@/utils/constants';
import {MetadataRoute} from 'next';

const domain = process.env.DOMAIN || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postsConfig: MetadataRoute.Sitemap = posts.map(({slug, date}) => ({
    url: domain + slug,
    lastModified: new Date(date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoriesConfig: MetadataRoute.Sitemap = categories.map((cat) => {
    const postsByCategory = posts.filter((post) => post.category === cat);
    return {
      url: domain + cat,
      lastModified:
        postsByCategory.length > 0
          ? new Date(postsByCategory[0].date)
          : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...categoriesConfig,
    ...postsConfig,
  ];
}
