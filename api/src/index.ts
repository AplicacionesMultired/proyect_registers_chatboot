import express from "express"
import { oracleDB } from './connections/oracleDB'

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})

async function testConn () {
  try {
    await oracleDB.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConn()
  .then(() => console.log('Connection test complete'))
  .catch((err) => console.error('Connection test failed:', err))