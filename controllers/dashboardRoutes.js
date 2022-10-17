const router = require('express').Router();
const { User, Post, Comments } = require('../models');
const withAuth = require('../utils/auth');

//get all posts
router.get('/',withAuth, async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        attributes: [
          'id',
          'title',
          'description',
          'date_created'
        ],
        include: [
          {
            model: Comments,
            attributes: ['id', 'comment', 'post_id', 'user_id', 'date_created'],
            include: {
              model: User,
              attributes: ['name']
            }
          },
          {
            model: User,
            attributes: ['name']
          }
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('profile', {
        posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/edit/:id', withAuth, async (req, res) => {
      try{
     const postData = Post.findByPk({
        where:{
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            'date_created'
        ],
        include: [
            {
              model: Comments,
              attributes: ['id', 'comment', 'post_id', 'user_id', 'date_created'],
              include: {
                model: User,
                attributes: ['name']
              }
            },
            {
              model: User,
              attributes: ['name']
            }
          ],
    
      });
            // Serialize data so the template can read it
            const posts = postData.get({ plain: true });
  
            // Pass serialized data and session flag into template
            res.render('editPost', {
              posts,
              logged_in: req.session.logged_in
            });
          } catch (err) {
            res.status(500).json(err);
    }
});

module.exports = router;