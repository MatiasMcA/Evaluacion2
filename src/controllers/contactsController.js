const service = require('../services/contactsService');

exports.list = async (req, res, next) => {
  try {
    const items = await service.list();
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await service.getById(id);
    if (!item) return res.json({ error: 'Not found', data: null });
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const created = await service.create(data);
    res.json({ data: created });
  } catch (err) {
    if (err.message === 'VALIDATION') return res.json({ error: err.details });
    next(err);
  }
};
