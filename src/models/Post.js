const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

PostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

PostSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post_id',
  localField: '_id',
});

module.exports = mongoose.model('Post', PostSchema);
