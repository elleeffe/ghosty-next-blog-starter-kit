import {MetadataRoute} from 'next';

const domain = process.env.DOMAIN || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: domain + 'sitemap.xml',
  };
}
