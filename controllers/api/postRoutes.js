//used my project2 as reference for this challenge 
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../utils/auth');


// Get a post
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll();

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});




//Create a post 
router.post("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        console.log(postData)
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update post by id
router.put("/:id", withAuth, async (req, res) => {
    Post.update(
        {
            title: req.body.title,
            caption: req.body.content,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedPost) => {
            res.status(200).json(updatedPost);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

//Delete post by id 
router.delete("/:id", async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;