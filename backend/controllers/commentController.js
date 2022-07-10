const { request, query } = require('express');
const Post  = require('../models/post');
const Comment  = require('../models/comment');

exports.createComment = async (req, res, next) => {
    console.log(req.body.comment)
    const {text, user_id, post_id} = req.body.comment;
    try {
        // find out which post you are commenting
        const id = post_id;
        // get the comment text and record post id
        const comment = new Comment({
            text: text,
            post: post_id,
            user: user_id
        })
        // save comment
        await comment.save();
        // get this particular post
        const postRelated = await Post.findById(id);
        // push the comment into the post.comments array
        postRelated.comment.push(comment);
        // save and redirect...
        await postRelated.save(function (err) {
            if (err) { console.log(err) }
            res.status(200).json({
                success: true,
            })
        })

    }
    catch (error) {
        console.log(error)
    }
}