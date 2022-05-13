import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf8' });
      // Parse a list of cells from the file
      // Return the list of cells to browser
      res.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        // add code to create a file and add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Make sure file exists
    // If not, it will be created automatically
    // Take the list of cells from the request obj
    // Serialize the list
    const { cells }: { cells: Cell[] } = req.body;

    // Write the serialized list to the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
