const User = require('../models/User');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const {
  fetchUsers,
  fetchUser,
  createUser,
} = require('../services/users');

describe('User Service', () => {
  describe('fetchUsers', () => {
    it('should return the list of users', async () => {
      const users = [
        {
          username: 'llfalcao',
          first_name: 'Luiz',
          last_name: 'Falcao',
          hobbies: ['coding', 'music'],
        },
        {
          username: 'user2',
          first_name: 'user',
          last_name: 'two',
          hobbies: ['math'],
        },
      ];

      mockingoose(User).toReturn(users, 'find');
      const results = await fetchUsers();

      results.map((result, i) => {
        const user = users[i];
        expect(result).toEqual(
          expect.objectContaining(user)
        );
      });
    });
  });

  describe('fetchUser', () => {
    it('should return a user', async () => {
      const _id = mongoose.Types.ObjectId();
      const user = {
        username: 'llfalcao',
        first_name: 'Luiz',
        last_name: 'Falcao',
        hobbies: ['coding', 'music'],
      };

      mockingoose(User).toReturn(user, 'findOne');
      const results = await fetchUser(_id);

      expect(results).toEqual(
        expect.objectContaining(user)
      );
    });
  });

  describe('createUser', () => {
    it('should return a created user', async () => {
      const user = {
        username: 'llfalcao',
        first_name: 'Luiz',
        last_name: 'Falcao',
        hobbies: ['coding', 'music'],
      };

      mockingoose(User).toReturn(user, 'save');
      const results = await createUser(user);

      expect(results).toEqual(
        expect.objectContaining(user)
      );
    });
  });
});
