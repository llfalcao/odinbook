const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
    default: 0,
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

CommentSchema.virtual('url').get(function () {
  return `/posts/${post_id}/${_id}`;
});

module.exports = model('Comment', CommentSchema);
