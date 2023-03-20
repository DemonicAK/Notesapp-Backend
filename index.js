const express = require("express");
const connectdb = require("./db");

connectdb();

const app = express();
const port = 5000;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello ak!')
// })

app.use("/api/auth", require("./routes/auth"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
