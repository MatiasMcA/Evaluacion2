module.exports = (err, req, res, next) => {
  console.error(err);
  // Return JSON error payload without explicit HTTP status code
  res.json({ error: 'Internal Server Error' });
};
