const { request, query } = require('express');
const Post  = require('../models/post');
const Comment  = require('../models/comment');
const Reply  = require('../models/reply');

exports.createComment = async (req, res, next) => {
    const {text, user_id, post_id} = req.body;
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
        const comments = await Comment.find({ post: post_id }).populate('user').populate('reply').populate({
            path: 'reply',
            populate:{
                path: 'user',
            }
        });
        await postRelated.save(function (err) {
            if (err) { console.log(err) }
            res.status(200).json({
                success: true,
                "message": "Comment added successfully",
                "comment": comments
            })
        })

    }
    catch (error) {
        console.log(error)
    }
}


exports.createReply = async (req, res, next) => {
    const {text, user_id, post_id, comment_id} = req.body;
    try {
        // find out which post you are commenting
        const id = comment_id;
        // get the comment text and record post id
        const reply = new Reply({
            text: text,
            comment: comment_id,
            user: user_id
        })
        // save comment
        await reply.save();
        // get this particular post
        const commentRelated = await Comment.findById(id);
        // push the comment into the post.comments array
        commentRelated.reply.push(reply);
        await commentRelated.save();
        // save and redirect...
        const comments = await Comment.find({ post: post_id }).populate('user').populate('reply').populate({
            path: 'reply',
            populate:{
                path: 'user',
            }
        });
        res.status(200).json({
            success: true,
            "message": "reply added successfully",
            "comment": comments,
        })

    }
    catch (error) {
        console.log(error)
    }
}