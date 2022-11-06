const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await User.findAll({
            attributes: { exclude: password }
        })
        return res.json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await User.findOne({
//             attributes:
//             {
//                 exclude: ["password"]
//             },
//             where: {
//                 id: req.params.id
//             },
//             include: [
//                 {
//                     model: Post,
//                     attributes: ["title", "id", "title", "content", "created_at"]
//                 },
//                 {
//                     model: Comment,
//                     attributes: ["id", "post_content", "created_at"]
//                 }
//                 })
//         if (!postData) {
//             res.status(404).json({ message: "No post found" })
//         }
//         return res.json(postData)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post('/', async (req, res) => {
    try {
        const postData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.user_id = postData.id
        req.session.username =  postData.username;
        req.session.logged_in = true;
        return res.json(postData)
    }catch (err) {
        res.status(500).json(err);
}
});


router.post('/login', async (req, res) => {
    try {
        // Find the user who matches the posted e-mail address
        const postData = await User.findOne({ where: { email: req.body.email } });

        if (!postData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Verify the posted password with the password store in the database
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postData = await User.update(req.body, {
            hooks: true,
            where: {
                id: req.params.id,
            }
        })
        if (! postData) {
            res.status(404).json({message: "No post found"})
        }
        return res.json(postData)
    } catch (err) {
            res.status(500).json(err);
        }
    });

module.exports = router;
