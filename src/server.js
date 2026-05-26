const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const contactsRoutes = require('./routes/contacts');
const authRoutes = require('./routes/auth');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';

app.use(bodyParser.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

// Serve static frontend from project root
app.use(express.static(path.join(__dirname, '..')));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
