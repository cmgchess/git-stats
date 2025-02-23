import { getCommitsForRepo } from '../utils/git';
import { Request, Response } from 'express';
import { chunk } from '../utils/array';

export const getConfig = (req: Request, res: Response): void => {
    res.status(200).json({
        author: req.app.locals?.author || '',
        directories: req.app.locals?.directories || [],
    });
};

export const getCommitsPerDay = async (
    req: Request,
    res: Response
): Promise<void> => {
    const directories: string[] = req.app.locals?.directories || [];
    const author: string = req.app.locals?.author;
    if (!directories.length || !author)
        res.status(400).json({ error: 'Not configured' });
    const CHUNK_SIZE = 3;

    const chunkedDirs = chunk(directories, CHUNK_SIZE);
    try {
        const commits: { [date: string]: { [repoName: string]: number } } = {};
        for (const dirs of chunkedDirs) {
            const logs = await Promise.all(
                dirs.map((dir) => getCommitsForRepo(dir, author))
            );
            logs.forEach((dateArrs, idx) => {
                const repoName = dirs[idx].split('/').at(-1);
                if (!repoName) return;
                dateArrs.forEach((date) => {
                    if (!commits[date]) commits[date] = {};
                    if (!commits[date][repoName]) commits[date][repoName] = 0;
                    commits[date][repoName] += 1;
                });
            });
        }
        res.status(200).json({ author, commits });
    } catch (error) {
        console.error('❌ Error fetching commits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
