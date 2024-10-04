const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/route");
const connectDB = require("./src/db/dbconnect");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());
module.exports = app;
app.use(routes);
dotenv.config({
  path: "./.env",
});
app.use('/public', express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000

connectDB();
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});


