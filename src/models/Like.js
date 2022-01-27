const { Schema, model } = require('mongoose');

const LikeSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Like', LikeSchema);
