const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  created_at: Date,
  updated_at: Date,
  likes: Number,
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
