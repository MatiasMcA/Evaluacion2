const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  
  if (username === 'user' && password === 'pass') {
  
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
