import express from 'express';
import router from './routes/index.js';
// Set up the express app
const app = express();
// get all todos

const PORT = 5000;
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});