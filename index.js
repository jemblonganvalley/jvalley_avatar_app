//PACKAGE
const express = require("express");
const cors = require("cors");
const path = require("path");
const user = require("./routes/user_routes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

//MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use("/api", user);

//LISTENER
app.listen(PORT, () => {
  console.log(`listen port ${PORT}`);
});
