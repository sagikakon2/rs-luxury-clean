import { createClient } from '@base44/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const base44 = createClient({ appId: '69b68eace574b76f517200e1' });

const MEDIA_FILES = [
  ...fs.readdirSync(path.join(projectRoot, 'public/images')).map(f => ({
    localPath: path.join(projectRoot, 'public/images', f),
    publicPath: `/images/${f}`,
    name: f,
  })),
  ...fs.readdirSync(path.join(projectRoot, 'public/videos')).map(f => ({
    localPath: path.join(projectRoot, 'public/videos', f),
    publicPath: `/videos/${f}`,
    name: f,
  })),
];

async function uploadFile(filePath, fileName) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(fileName).toLowerCase();
  
  const mimeTypes = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  };
  
  const blob = new Blob([buffer], { type: mimeTypes[ext] || 'application/octet-stream' });
  const file = new File([blob], fileName, { type: blob.type });
  
  const result = await base44.integrations.Core.UploadFile({ file });
  return result.file_url;
}

async function main() {
  const mapping = {};
  
  console.log(`Uploading ${MEDIA_FILES.length} files to Base44 CDN...\n`);
  
  for (const media of MEDIA_FILES) {
    try {
      process.stdout.write(`  Uploading ${media.name}...`);
      const url = await uploadFile(media.localPath, media.name);
      mapping[media.publicPath] = url;
      console.log(` ✓ ${url}`);
    } catch (err) {
      console.log(` ✗ ${err.message}`);
    }
  }
  
  const outputPath = path.join(projectRoot, 'scripts/cdn-mapping.json');
  fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2));
  console.log(`\nMapping saved to ${outputPath}`);
  console.log(`\nTotal uploaded: ${Object.keys(mapping).length}/${MEDIA_FILES.length}`);
}

main().catch(console.error);
