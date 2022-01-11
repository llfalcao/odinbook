import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  created_at: { type: Date, required: true },
  date_of_birth: { type: Date, required: true },
  hobbies: [String],
  location: {
    city: String,
    state: String,
    country: { type: String, required: true },
  },
  profile_pic: { type: String, required: true },
});

UserSchema.virtual('full_name').get((user) => {
  return `${user.first_name} ${user.last_name}`;
});

UserSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'userId',
  localField: '_id',
});

UserSchema.virtual('url').get((user) => `/${user.username}`);

export default model('User', UserSchema);
