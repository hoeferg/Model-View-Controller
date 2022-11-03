const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                "id",
                "title",
                "content",
                "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "created_at",
                    ],
                    include: {
                        model: User,
                        attributes: ["username"],
                    }
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            post,
            // Pass the logged in flag to the template
            logged_in: req.session.logged_in,
        });
        console.log(postData)
        return res.json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/post/:id', async (req, res) => {
    try {
        // finds the post info
        const postData = Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["username"] },
                { model: Comment, include: [User] },
            ],
        })
        const post = postData.get({ plain: true});
        res.render("post", { ...post, logged_in: req.session.logged_in });
        if (! postData) {
            res.status(404).json({message: "No post found"})
        }
} catch (err) {
        res.status(500).json(err);
    }
});


router.get('/post-comment', async (req, res) => {
    try {
        const commentData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                "title",
                "content",
                "id",
                "user_id",
                "created_at"
                // "created_at"
            ],
            include: {
                model: User,
                attributes: [
                    "username"
                ]
            },
            model: User,
            attributes: ["username"]
        })
        const post = commentData.get({ plain: true});
        res.render("post", { ...post, logged_in: req.session.logged_in });
        if (! commentData) {
            res.status(404).json({message: "No comment found"})
        }
    } catch (err) {
            res.status(500).json(err);
        }
    });



module.exports = router; 