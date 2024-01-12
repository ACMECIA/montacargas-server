CREATE TABLE `acme_db`.`local_data` (`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `data` TEXT NOT NULL ) ENGINE = InnoDB;

CREATE TABLE `acme_db`.`offline_data` (`data` TEXT NOT NULL ) ENGINE = InnoDB;

CREATE TABLE `acme_db`.`users` (`id` INT(30) NOT NULL AUTO_INCREMENT , `email` VARCHAR(30) NOT NULL , `username` VARCHAR(15) NOT NULL , `password` TEXT NOT NULL , `rol` VARCHAR(10) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `acme_db`.`persistent_data` (`id` INT NOT NULL AUTO_INCREMENT , `type` VARCHAR(20) NOT NULL , `name` VARCHAR(20) NOT NULL , `json` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;