import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
