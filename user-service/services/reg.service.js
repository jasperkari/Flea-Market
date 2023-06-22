const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  name: 'reg',
  actions: {
    async register(ctx) {
      const { params } = ctx;
      if (!params.username || !params.password || !params.email) {
        return {
          error: 'Invalid input: username, password and email are required'
        };
      }
      const users = await ctx.call('userDb.getUsers');
      const userExists = users.some(
        (user) => user.username === params.username
      );
      if (userExists) {
        return { error: 'A user with this username already exists' };
      }

      const hashedPassword = await bcrypt.hash(params.password, saltRounds);
      const user = {
        username: params.username,
        password: hashedPassword,
        email: params.email,
        admin: false
      };
      const response = await ctx.call('userDb.createUser', user);
      return response.result;
    }
  }
};
