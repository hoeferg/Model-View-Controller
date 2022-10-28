const Comment = require("../models/Comment")
const commentData = [
    {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conseq",
        user_id: 1,
        post_id: 1
    },
    {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        user_id: 2,
        post_id: 2
    },
]

const seedComment = () => {
    Comment.bulkCreate(commentData)
}

module.exports = seedComment