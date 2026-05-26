const service = require('../services/userService');

exports.register = async (req, res, next) => {
  try {
    const data = req.body;
    const created = await service.register(data);
    res.json({ data: created, message: 'User registered successfully' });
  } catch (err) {
    if (err.message === 'VALIDATION') return res.json({ error: err.details });
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    const user = await service.login(username, password);
    
    if (user) {
      res.cookie('session', user.id, { httpOnly: true, sameSite: 'lax' });
      return res.json({ message: 'logged', user });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    next(err);
  }
};
