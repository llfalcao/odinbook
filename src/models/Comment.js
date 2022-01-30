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
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
  },
});

module.exports = model('Comment', CommentSchema);
