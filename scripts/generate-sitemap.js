import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://snapsec.co';

const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/platform', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/methodology', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/our-methodology', priority: '0.8', changefreq: 'weekly' },
  { path: '/about-us', priority: '0.8', changefreq: 'weekly' },
  { path: '/our-work', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/discovery/asm', priority: '0.8', changefreq: 'weekly' },
  { path: '/discovery/aim', priority: '0.8', changefreq: 'weekly' },
  { path: '/discovery/was', priority: '0.8', changefreq: 'weekly' },
  { path: '/discovery/vs', priority: '0.8', changefreq: 'weekly' },
  { path: '/discovery/vm', priority: '0.8', changefreq: 'weekly' },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  routes.forEach((route) => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>\n`;
  
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Sitemap successfully generated at: ${sitemapPath}`);
}

generateSitemap();
