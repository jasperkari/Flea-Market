const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = {
  async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'No token provided' }));
      return;
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.$ctx.meta.user = decoded;
      const ctx = req.$ctx;
      const users = await ctx.call('userDb.getUsers');
      const user = users.find((u) => u.username === decoded.username);
      if (!user || user.password !== decoded.password) {
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            error: 'Invalid credentials'
          })
        );
        return;
      }
    } catch (error) {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'Invalid token' }));
      return;
    }
    next();
  }
};
