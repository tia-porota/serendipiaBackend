require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routeUsers = require("./routes/routeUsers");
const routeGroups = require("./routes/routeGroups");
const routePublic = require("./routes/routePublic");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", routeUsers);
app.use("/groups", routeGroups);
app.use("/public",routePublic);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONN);
mongoose.connection.once("open", () =>
  console.log("DB en " + process.env.CONN)
);

app.listen(process.env.PORT, () => {
  console.log("Corriendo en " + process.env.PORT);
});
