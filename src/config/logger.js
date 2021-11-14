const winston = require('winston');
//create your own format
const { combine, timestamp, label, printf } = winston.format;
const myformat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}:${message}`;
});

// creating logger
const logger = winston.createLogger({
    format: combine(
        winston.format.colorize(),
        label({ label: process.env.MYPROJECT }),
        timestamp(),
        myformat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/combine.log' }),
        new winston.transports.File({ filename: 'src/logs/http.log', level: 'http' })
    ],
});

module.exports = logger;