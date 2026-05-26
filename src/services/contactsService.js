const fs = require('fs').promises;
const path = require('path');
const dataFile = path.join(__dirname, '..', 'data', 'contacts.json');

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

function validate(contact) {
  const errors = [];
  if (!contact || !contact.name) errors.push('name required');
  if (!contact || !contact.email || !/^\S+@\S+\.\S+$/.test(contact.email)) errors.push('valid email required');
  return errors;
}

exports.list = async () => await readData();

exports.getById = async (id) => {
  const items = await readData();
  return items.find((i) => i.id === id);
};

exports.create = async (contact) => {
  const errs = validate(contact);
  if (errs.length) {
    const err = new Error('VALIDATION');
    err.details = errs;
    throw err;
  }
  const items = await readData();
  const id = String(Date.now());
  const newItem = { id, name: contact.name, email: contact.email, phone: contact.phone || '' };
  items.push(newItem);
  await writeData(items);
  return newItem;
};
