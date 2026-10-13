import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const distDir = path.resolve(__dirname, 'dist');

// Serve static assets with long-term cache headers
app.use(express.static(distDir, {
  maxAge: '1d',
  immutable: false,
}));

// SPA Fallback: send index.html for any unhandled routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Maison Motors production server running at http://0.0.0.0:${port}`);
});
