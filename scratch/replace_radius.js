const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];
const fileExtensions = ['.tsx', '.ts', '.css'];

const replaceRadius = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match rounded-xl, rounded-2xl, rounded-3xl, rounded-lg, rounded-md
  // Also match any existing rounded-[5px] just in case
  const newContent = content
    .replace(/\brounded-xl\b/g, 'rounded-[8px]')
    .replace(/\brounded-2xl\b/g, 'rounded-[8px]')
    .replace(/\brounded-3xl\b/g, 'rounded-[8px]')
    .replace(/\brounded-lg\b/g, 'rounded-[8px]')
    .replace(/\brounded-md\b/g, 'rounded-[8px]')
    .replace(/\brounded-\[5px\]/g, 'rounded-[8px]');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
};

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkSync(fullPath);
    } else if (fileExtensions.some(ext => fullPath.endsWith(ext))) {
      replaceRadius(fullPath);
    }
  }
};

directories.forEach(dir => {
  const fullDirPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullDirPath)) {
    walkSync(fullDirPath);
  }
});
