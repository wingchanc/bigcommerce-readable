const mysql = require('mysql2');
const util = require('util');
require('dotenv').config();

const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    ...(process.env.MYSQL_PORT && { port: process.env.MYSQL_PORT }),
};

const connection = mysql.createConnection(process.env.DATABASE_URL ? process.env.DATABASE_URL : MYSQL_CONFIG);
const query = util.promisify(connection.query.bind(connection));

const usersCreate = query('CREATE TABLE `users` (\n' +
    '  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\n' +
    '  `userId` int(11) NOT NULL,\n' +
    '  `email` text NOT NULL,\n' +
    '  `username` text,\n' +
    '  PRIMARY KEY (`id`),\n' +
    '  UNIQUE KEY `userId` (`userId`)\n' +
    ') ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;\n'
);

const storesCreate = query('CREATE TABLE `stores` (\n' +
    '  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\n' +
    '  `storeHash` varchar(10) NOT NULL,\n' +
    '  `accessToken` text,\n' +
    '  `scope` text,\n' +
    '  PRIMARY KEY (`id`),\n' +
    '  UNIQUE KEY `storeHash` (`storeHash`)\n' +
    ') ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;'
);

const storeUsersCreate = query('CREATE TABLE `storeUsers` (\n' +
    '  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\n' +
    '  `userId` int(11) NOT NULL,\n' +
    '  `storeHash` varchar(10) NOT NULL,\n' +
    '  `isAdmin` boolean,\n' +
    '  PRIMARY KEY (`id`),\n' +
    '  UNIQUE KEY `userId` (`userId`,`storeHash`)\n' +
    ') ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;\n'
);

const configsCreate = query('CREATE TABLE `configs` (\n' +
    '  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\n' +
    '  `storeHash` varchar(10) NOT NULL,\n' +
    '  `config` JSON NOT NULL,\n' +
    '  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
    '  PRIMARY KEY (`id`),\n' +
    '  UNIQUE KEY `storeHash` (`storeHash`)\n' +
    ') ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;\n'
);

Promise.all([usersCreate, storesCreate, storeUsersCreate, configsCreate]).then(() => {
    connection.end();
});
