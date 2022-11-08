const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    // try {
    const postData = await Post.findAll({
        attributes: [
            "id",
            "title",
            "post_content",
            // "created_at"
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_content",
                    "post_id",
                    "user_id",
                    // "created_at",
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                }
            }
        ]
    })
        .then((dbPostData) => {
            console.log('dbPostData line 36 postRoutes.js', dbPostData)
        })
    //return res.json(postData)
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});


// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await Post.findOne({
//             where: [
//                 id: req.params.id,
//             ],
//             attributes: [
//                 "id",
//                 "title",
//                 "content",
//                 
//             ],
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 },
//                 {
//                     model: Comment,
//                     attributes: [
//                         "id",
//                         "comment_content",
//                         "post_id",
//                         "user_id",
//                         "created_at",
//                     ],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     }
//                 }
//             ]
//         })
//         if (! postData) {
//             res.status(404).json({message: "No post found"})
//         }
//         return res.json(postData)
//     } catch (err) {
//             res.status(500).json(err);
//         }
//     });

// router.get('/:id', withAuth async (req, res) => {
//     try {
//         const postData = await Post.update(
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             },
//             {
//                 title: req.body.title,
//                 content: req.body.content.
//             },
//                 if (!postData) {
//             res.status(404).json({ message: "No post found" })
//         }
//         return res.json(postData)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.delete('/:id', withAuth async (req, res) => {
//     try {
//         const postData = await Post.destroy(
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             },

//                 if (!postData) {
//             res.status(404).json({ message: "No post found" })
//         }
//         return res.json(postData)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
        })
        if (!postData) {
            res.status(404).json({ message: "No post found" })
        }
        return res.json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
