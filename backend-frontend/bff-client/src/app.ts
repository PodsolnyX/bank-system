import express from 'express';
import { UserRouter } from './routes';

const app = express();
const port = process.env.PORT || 3000;


app.use("/user", UserRouter);

app.use((_req, res) => {
  res.sendStatus(404);
});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});