const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  hobbies: [String],
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      required: true,
    },
  },
  profile_pic: {
    type: String,
    default: 'https://i.imgur.com/nM4yoyw.jpg',
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

UserSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user_id',
  localField: '_id',
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

module.exports = model('User', UserSchema);
