const dotenv = require('dotenv');
const path = require('path');

// Set the NODE_ENV to 'development' by default

process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const envFound = dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });
console.log(`===== Environment : ${process.env.NODE_ENV} =====`);
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
const config = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 4200,
    EXPIRY_MINUTES: process.env.MINUTES_TO_ADD,
    DBREAD : process.env.HOSTREAD,
    DBWRITE : process.env.HOSTWRITER,
    DBUSER : process.env.USER,
    DBPASS : process.env.DBPASS,
    DB : process.env.DATABASE
}
module.exports = { config };