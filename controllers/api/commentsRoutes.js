const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../utils/auth');

router.post('/',withAuth, async (reqq, res) => {
    try{
        const comment = await Comments.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id

        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;