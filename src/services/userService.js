const fs = require('fs').promises;
const path = require('path');
const dataFile = path.join(__dirname, '..', 'data', 'users.json');

async function readData() {
  try {
    const content = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(content || '[]');
  } catch (e) {
    return [];
  }
}

async function writeData(items) {
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2));
}

function validate(user) {
  const errors = [];
  if (!user || !user.username) errors.push('username required');
  if (!user || !user.password || user.password.length < 3) errors.push('password must be at least 3 characters');
  return errors;
}

exports.register = async (user) => {
  const errs = validate(user);
  if (errs.length) {
    const err = new Error('VALIDATION');
    err.details = errs;
    throw err;
  }
  
  const users = await readData();
  
  // Check if username already exists
  if (users.find(u => u.username === user.username)) {
    const err = new Error('VALIDATION');
    err.details = ['username already exists'];
    throw err;
  }
  
  const newUser = { id: String(Date.now()), username: user.username, password: user.password };
  users.push(newUser);
  await writeData(users);
  return { id: newUser.id, username: newUser.username };
};

exports.login = async (username, password) => {
  const users = await readData();
  const user = users.find(u => u.username === username && u.password === password);
  return user ? { id: user.id, username: user.username } : null;
};
