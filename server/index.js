const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// use Route
const posts = require("./routes/api/post");
app.use("/api/posts", posts);
// handle Production
if (process.env.MODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));
  //handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runing at port ${port}`);
});
