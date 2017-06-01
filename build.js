const fs = require('fs');
const copy = require('copy');

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, '  '), 'utf8');
}

copy(['index.html', 'public/**/*'], 'dist', {
  cwd: __dirname
}, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  writeJSON('dist/package.json', {
    name: 'yax-hackernews',
    scripts: {
      start: 'serve -s .'
    },
    dependencies: {
      serve: 'latest'
    }
  });
  console.log('Copy files done.');
  process.exit(0);
});
  