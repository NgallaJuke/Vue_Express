const router = require("express").Router();
const mongodb = require("mongodb");
// get post

router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// add post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});
// delete post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://brad:brad123@vuejs-express-p1kvt.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db("Vue_Express").collection("posts");
}

module.exports = router;
