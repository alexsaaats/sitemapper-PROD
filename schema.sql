

CREATE DATABASE  `saaatsmini`;
USE `saaatsmini`;

CREATE TABLE siteurls (
    id int NOT NULL,
    URLid int NOT NULL,
    URL varchar(500),
    statusCode varchar(500),
    screenshotPath varchar(500),
    createdAt DATETIME,
    updatedAt DATETIME,
    PRIMARY KEY (URLid)
);
