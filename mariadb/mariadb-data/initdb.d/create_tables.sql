-- CREATE TABLE `acme_db`.`local_data` (`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `data` TEXT NOT NULL ) ENGINE = InnoDB;

-- CREATE TABLE `acme_db`.`offline_data` (`data` TEXT NOT NULL ) ENGINE = InnoDB;

-- CREATE TABLE `acme_db`.`users` (`id` INT(30) NOT NULL AUTO_INCREMENT , `email` VARCHAR(30) NOT NULL , `username` VARCHAR(15) NOT NULL , `password` TEXT NOT NULL , `rol` VARCHAR(10) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- CREATE TABLE `acme_db`.`persistent_data` (`id` INT NOT NULL AUTO_INCREMENT , `type` VARCHAR(20) NOT NULL , `name` VARCHAR(20) NOT NULL , `json` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


--NEW TABLES

CREATE TABLE `alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `alert_type` int(11) NOT NULL,
  `code_device` varchar(30) NOT NULL DEFAULT 'KM061657',
  `hourmeter` int(30) NOT NULL,
  `ton` float NOT NULL DEFAULT 4.5,
  `mant_type` varchar(30) NOT NULL DEFAULT 'correctivo',
  `checklist` tinyint(1) NOT NULL DEFAULT 0,
  `comments` text NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `local_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `monthly_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `total_hours` text NOT NULL,
  `effective` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `month_year_unique` (`month`,`year`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `persistent_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `tag` varchar(20) NOT NULL,
  `json` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `users` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `rol` varchar(10) NOT NULL,
  `reports` tinyint(1) NOT NULL DEFAULT 0,
  `alerts` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Adding data
INSERT INTO `persistent_data` (`id`, `type`, `name`, `tag`, `json`) VALUES
(1, 'status', 'Equipo', 'label', 'Montacargas'),
(2, 'status', 'Marca', 'label', 'TOYOTA 4.5 TN'),
(3, 'status', 'Modelo', 'label', '02-7FG45 N/S'),
(4, 'status', 'Bastidor', 'label', 'A7FGA50-51912'),
(5, 'status', 'Cod. Activo', 'label', 'KM0061657'),
(6, 'status', 'Tonelaje', 'label', '4.5'),
(9, 'device', 'Horario', 'schedule', '{\"weekdays\":[1,1,1,1,1,1,1],\"initHour\":6,\"endHour\":18.5}'),
(12, 'alert', 'Alerta', 'alert_flag', '0'),
(13, 'setting', 'Límites de coordenadas', 'coordinates', '{\"minLat\":-12.0487, \"maxLat\": -12.0468, \"minLon\": -77.1017, \"maxLon\":-77.1001}'),
(14, 'alert', 'Mantenimientos Preventivos', 'mant_prevs', '{\"prev1\":250,\"prev2\":500,\"prev3\":750}'),
(15, 'alert', 'Horometro de Ultima Alerta', 'last_alert_hour', '160');