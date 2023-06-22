const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = {
  async authenticate(req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
      return;
    }
    const ctx = req.$ctx;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    let decoded;

    if (!token) {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'No token provided' }));
      return;
    }
    try {
      decoded = jwt.verify(token, secret);
      req.$ctx.meta.user = decoded;
    } catch (err) {
      res.statusCode = 401;
      res.end(
        JSON.stringify({
          error: 'Invalid token'
        })
      );
      return;
    }

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
    next();
  }
};
