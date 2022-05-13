import express from 'express';

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get('/cells', async (req, res) => {
    // Make sure cell storage file exists (user provides this in CLI)
    // If file does not exist, add in default list of cells.
    // Read the file
    // Parse a list of cells from the file
    // Return the list of cells to browser
  });

  router.post('/cells', async (req, res) => {
    // Make sure file exists
    // If not, create it
    // Take the list of cells from the request obj
    // Serialize the list
    // Write the serialized list to the file
  });

  return router;
};
