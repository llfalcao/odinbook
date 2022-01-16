const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  body: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: Date,
  likes: {
    type: Number,
    default: 0,
  },
  liked_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

PostSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post_id',
  localField: '_id',
});

module.exports = model('Post', PostSchema);
