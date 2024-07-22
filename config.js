const dotenv = require('dotenv');
const path = require('path');

const env = process.env.REACT_APP_ENV || 'development';

const envFile = path.resolve(__dirname, `.env.${env}`);

dotenv.config({ path: envFile });

module.exports = process.env;