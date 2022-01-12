const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  created_at: Date,
  date_of_birth: Date,
  hobbies: [String],
  location: {
    city: String,
    state: String,
    country: String,
  },
  profile_pic: String,
  friends: [
    { type: Schema.Types.ObjectId, ref: 'User' },
  ],
});

UserSchema.virtual('full_name').get((user) => {
  return `${user.first_name} ${user.last_name}`;
});

UserSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'author',
  localField: '_id',
});

UserSchema.virtual('url').get(
  (user) => `/${user.username}`
);

module.exports = mongoose.model('User', UserSchema);
