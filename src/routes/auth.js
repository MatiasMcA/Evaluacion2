const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  // simple hardcoded credential for demo
  if (username === 'user' && password === 'pass') {
    // set a simple httpOnly cookie to represent session
    res.cookie('session', '1', { httpOnly: true, sameSite: 'lax' });
    return res.json({ message: 'logged' });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ message: 'logged out' });
});

module.exports = router;
