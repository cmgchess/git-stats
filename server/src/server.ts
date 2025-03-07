import * as rawConfig from '../../config.json';
import gitRoutes from './routes/git';
import { Config } from './types';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const config: Config = rawConfig;
const app = express();
const port = 3000;

app.use(cors());

(() => {
  const dirs = new Set<string>();
  config.individual.forEach((dir) => dirs.add(dir.replace(/\\/g, '/')));
  config.directory.forEach((dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (!stat.isDirectory()) continue;
      const gitFolderPath = path.join(filePath, '.git');
      if (fs.existsSync(gitFolderPath)) dirs.add(filePath.replace(/\\/g, '/'));
    }
  });
  app.locals.directories = [...dirs];
  app.locals.author = config.author;
})();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/git', gitRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
