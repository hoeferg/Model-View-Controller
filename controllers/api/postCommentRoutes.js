const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Comment.findAll({});
        return res.json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Comment.findAll({
            where: {
                id: req.params.id,
            }
        });
        return res.json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Comment.create({
            where: {
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            }
        });
        return res.json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.get('/:id', withAuth async (req, res) => {
//     try {
//         const postData = await Comment.update(
//             {
//                 where: {
//                     id: req.params.id,
//                 },
//                 {
//                 comment_text: req.body.comment_text,
//             }   
//             return res.json(postData)
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Comment.destroy(
            {
                where: {
                    id: req.params.id
                }
            })
        if (!postData) {
            res.status(404).json({ message: "No post found" })
        }
        return res.json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
