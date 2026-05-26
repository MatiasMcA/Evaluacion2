const API_KEY = process.env.API_KEY || 'my-api-key';

exports.protectWrite = (req, res, next) => {
  const key = req.get('x-api-key');
  if (key && key === API_KEY) return next();
  if (req.cookies && req.cookies.session) return next();
  return res.status(401).json({ error: 'Unauthorized - provide API key or login' });
};
