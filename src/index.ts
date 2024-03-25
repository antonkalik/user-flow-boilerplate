import * as dotenv from 'dotenv';
import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from 'src/routes';
import { initialize } from 'src/initializers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

(async () => {
  try {
    await initialize();
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
