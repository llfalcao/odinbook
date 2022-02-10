const { Schema, model } = require('mongoose');

const FriendRequestSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, required: true },
});

module.exports = model('FriendRequest', FriendRequestSchema);
