const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = process.env.JWT_SECRET;

module.exports = {
  name: 'auth',
  actions: {
    async login(ctx) {
      const { username, password } = ctx.params;
      const users = await ctx.call('userDb.getUsers');
      const user = users.find((u) => u.username === username);
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const expTime = Math.floor(Date.now() / 1000) + 86400;
          const token = jwt.sign(
            { username, password: user.password, exp: expTime },
            secret
          );
          return { token, expTime };
        }
      }
      throw new Error(`Invalid credentials`);
    },
    async authenticate(ctx) {
      const token = ctx.params;

      try {
        const decoded = jwt.verify(token, secret);
        const users = await ctx.call('userDb.getUsers');
        const user = users.find((u) => u.username === decoded.username);
        console.log(decoded);
        console.log(users);
        console.log(token);
        if (!user || user.password !== decoded.password) {
          return { authenticated: false };
        }
      } catch (error) {
        return { authenticated: false };
      }
      return { authenticated: true };
    }
  }
};
