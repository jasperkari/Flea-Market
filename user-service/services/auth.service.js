const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = process.env.JWT_SECRET;

module.exports = {
  name: 'auth',
  actions: {
    async login(ctx) {
      const { username, password } = ctx.params;
      const users = await ctx.call('db.getUsers');
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
    }
  }
};
