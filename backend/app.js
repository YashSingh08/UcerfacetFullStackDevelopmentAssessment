const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/sentence", (req, res) => {
  const sentence =
    "We design and develop applications that run the world and showcase the future";
  res.json({ sentence });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
