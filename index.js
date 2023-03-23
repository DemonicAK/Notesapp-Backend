const express = require("express");
const  cors = require('cors');
const connectdb = require("./db");
const dotenv = require("dotenv");
dotenv.config();


connectdb();

const app = express();
const port =  process.env.PORT;

app.use(cors())
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello ak!')
// })

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
