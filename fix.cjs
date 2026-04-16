const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.match(/\.(astro|ts|tsx|js|jsx)$/)) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('src');
const base = '/wetpets-kaustav-code';
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix href="/something"
  content = content.replace(/href="\/([^/].*?)"/g, `href="${base}/$1"`);
  content = content.replace(/href="\/"/g, `href="${base}/"`);

  // Fix src="/something"
  content = content.replace(/src="\/([^/].*?)"/g, `src="${base}/$1"`);
  
  // Fix CSS background-image url('/assets...')
  content = content.replace(/url\(\s*['"]?\/([^/].*?)['"]?\s*\)/g, `url('${base}/$1')`);
  
  // Fix JS object properties like href: '/...' or image: '/...'
  content = content.replace(/(href|image|src):\s*['"]\/([^/].*?)['"]/g, `$1: '${base}/$2'`);
  content = content.replace(/(href|image|src):\s*['"]\/['"]/g, `$1: '${base}/'`);

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
});

console.log('Fixed URLs in ' + count + ' files.');
