import { simpleGit } from 'simple-git';
import path from 'path';

export const getCommitsForRepo = async (
  dir: string,
  author: string
): Promise<string[]> => {
  try {
    const git = simpleGit(path.resolve(dir), { trimmed: true });
    const log = await git.raw([
      'log',
      'main',
      `--author=${author}`,
      '--date=format:%Y/%m/%d',
      '--pretty=format:%ad',
    ]);
    return log.split('\n').filter(Boolean);
  } catch (error) {
    console.error(`❌ Error fetching commits for ${dir}:`, error);
    return [];
  }
};
