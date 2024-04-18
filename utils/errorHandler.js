// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _) => {
  const { status, message } = err;
  if (status) res.status(status).json({ error: message });
  else res.status(500).json({ error: 'Internal Server Error' });
};
