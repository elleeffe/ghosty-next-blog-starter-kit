const fs = require('fs');
const path = require('path');
const {SitemapStream, streamToPromise} = require('sitemap');
const matter = require('gray-matter');

const domain = process.env.DOMAIN || 'http://localhost:3000';
const OUTPUT_FILE = __dirname + '/paths.txt';

async function generateSitemapFromList() {
  const smStream = new SitemapStream({hostname: domain});
  const listContents = fs.readFileSync(OUTPUT_FILE, 'utf8');
  const paths = listContents.split('\n');

  paths.forEach((filePath) => {
    if (filePath) {
      const parts = filePath.split(path.sep).filter(Boolean);
      let urlPath;

      switch (parts.length) {
        case 1:
          // Language homepage
          urlPath = `/${parts[0]}`;
          break;
        case 2:
          // Category page
          urlPath = `/${parts.join('/')}`;
          break;
        case 3:
          // Post page
          urlPath = `/${parts.join('/')}`;
          const content = fs.readFileSync(
            __dirname + '/_posts' + filePath + '.md',
            'utf8'
          );
          const {data: metadata} = matter(content);
          smStream.write({
            url: domain + urlPath,
            changefreq: 'weekly',
            priority: 0.7,
            lastmodISO: metadata.date,
          });
          return;
        default:
          return;
      }

      smStream.write({
        url: domain + urlPath,
        changefreq: 'weekly',
        priority: urlPath.split('/').length === 2 ? 0.9 : 0.8,
      });
    }
  });

  smStream.end();
  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
  fs.writeFileSync(
    path.join(__dirname.replace(/\/backend/g, ''), 'public', 'sitemap.xml'),
    sitemap
  );
  console.log('Sitemap generated successfully!');

  // Cleanup the paths list file
  fs.unlinkSync(OUTPUT_FILE);
}

generateSitemapFromList().catch((error) => {
  console.error('Failed to generate sitemap:', error);
});
