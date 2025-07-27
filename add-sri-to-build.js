const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');

const buildDir = path.join(__dirname, 'build');
const indexPath = path.join(buildDir, 'index.html');

function getSriHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha384').update(fileBuffer).digest('base64');
  return `sha384-${hash}`;
}

function addSriToIndexHtml() {
  let html = fs.readFileSync(indexPath, 'utf8');
  const $ = cheerio.load(html);

  // Add SRI to local <script> tags
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !src.startsWith('http') && !src.startsWith('//')) {
      const filePath = path.join(buildDir, src.replace(/^\/+/, ''));
      if (fs.existsSync(filePath)) {
        const sri = getSriHash(filePath);
        $(el).attr('integrity', sri);
        $(el).attr('crossorigin', 'anonymous');
      }
    }
  });

  // Add SRI to local <link rel="stylesheet"> tags
  $('link[rel="stylesheet"][href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
      const filePath = path.join(buildDir, href.replace(/^\/+/, ''));
      if (fs.existsSync(filePath)) {
        const sri = getSriHash(filePath);
        $(el).attr('integrity', sri);
        $(el).attr('crossorigin', 'anonymous');
      }
    }
  });

  fs.writeFileSync(indexPath, $.html(), 'utf8');
  console.log('SRI attributes added to build/index.html (robust version)');
}

addSriToIndexHtml(); 