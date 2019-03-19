SET FOREIGN_KEY_CHECKS = 0;

-- DROP TABLE IF EXISTS Owners;
DROP TABLE IF EXISTS Equipment_Categories;
DROP TABLE IF EXISTS Equipment_Manufacturers;
DROP TABLE IF EXISTS Equipment_Types;
DROP TABLE IF EXISTS Extras_Types;
DROP TABLE IF EXISTS Gym_Equipment;
DROP TABLE IF EXISTS Gym_Extras;
DROP TABLE IF EXISTS Gyms;

SET FOREIGN_KEY_CHECKS = 1;

-- CREATE TABLE Owners(
--   owner_id int NOT NULL AUTO_INCREMENT,
--   owner_fname varchar(255),
--   owner_lname varchar(255),
--   PRIMARY KEY (owner_id)
-- );
CREATE TABLE Equipment_Categories(
  equipment_category_id int NOT NULL AUTO_INCREMENT,
  equipment_category_name varchar(255) NOT NULL,
  PRIMARY KEY (equipment_category_id)
);
CREATE TABLE Equipment_Manufacturers(
  equipment_manufacturer_id int NOT NULL AUTO_INCREMENT,
  equipment_manufacturer_name varchar(255) NOT NULL,
  PRIMARY KEY (equipment_manufacturer_id)
);
CREATE TABLE Equipment_Types(
  equipment_id int NOT NULL AUTO_INCREMENT,
  equipment_name varchar(255) NOT NULL,
  equipment_description varchar(255),
  equipment_category int NOT NULL,
  PRIMARY KEY (equipment_id),
  CONSTRAINT fk_equipment_category FOREIGN KEY (equipment_category) REFERENCES Equipment_Categories(equipment_category_id)
);
CREATE TABLE Extras_Types(
  extra_id int NOT NULL AUTO_INCREMENT,
  extra_name varchar(255) NOT NULL,
  extra_description varchar(255),
  PRIMARY KEY (extra_id)
);
CREATE TABLE Gyms(
  gym_id int NOT NULL AUTO_INCREMENT,
  gym_name varchar(255) NOT NULL,
  gym_address varchar(255),
  gym_lat float(10, 6),
  gym_long float(10, 6),
  gym_city varchar(255),    /* Taken from geocode */
  gym_state varchar(255),   /* Taken from geocode */
  gym_image varchar(255),   /* URL for now */
  gym_owner varchar(255),
  gym_website varchar(255),
  gym_instagram varchar(255),
  gym_facebook varchar(255),
  gym_phone varchar(255),
  date_added date,
  PRIMARY KEY (gym_id)
);
CREATE TABLE Gym_Equipment(
  gym_equipment_id int NOT NULL AUTO_INCREMENT,
  equipment_gym int NOT NULL,
  equipment_type int NOT NULL,
  equipment_quantity int NOT NULL CHECK(equipment_quantity >= 0),
  PRIMARY KEY (gym_equipment_id),
  CONSTRAINT fk_equipment_gym FOREIGN KEY (equipment_gym) REFERENCES Gyms(gym_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_equipment_type FOREIGN KEY (equipment_type) REFERENCES Equipment_Types(equipment_id)
);
CREATE TABLE Gym_Extras(
  gym_extras_id int NOT NULL AUTO_INCREMENT,
  extra_gym int NOT NULL,
  extra_type int NOT NULL,
  extra_quantity int NOT NULL CHECK(extra_quantity >= 0),
  PRIMARY KEY (gym_extras_id),
  CONSTRAINT fk_extra_gym FOREIGN KEY (extra_gym) REFERENCES Gyms(gym_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_extra_type FOREIGN KEY (extra_type) REFERENCES Extras_Types(extra_id)
);

INSERT INTO Equipment_Categories (equipment_category_name) VALUES
  ('Barbells'),
  ('Strongman Implements'),
  ('Machines, Plate-Loaded'),
  ('Machines, Selectorized'),
  ('Machines, Other'),
  ('Benches'),
  ('Racks and Cages'),
  ('Dumbbells'),
  ('Plates');
INSERT INTO Equipment_Types (equipment_name, equipment_description, equipment_category) VALUES
  ('ER Rack', 'The best for meets', 7),
  ('Glute Ham Raise', 'Build them pork chords', 5),
  ('Reverse Hyperextension', null, 5),
  ('Husafel Stones', null, 2),
  ('Calibrated Plates, Powerlifting', null, 9),
  ('Deadlift Bar', null, 1),
  ('Squat Bar', null, 1),
  ('Power Bar', null, 1);
INSERT INTO Extras_Types (extra_name, extra_description) VALUES
  ('Turf', 'Great for athletes'),
  ('Benches', 'Great for sitting'),
  ('Loft', 'Fun times');
INSERT INTO Gyms (gym_name, gym_address, gym_lat, gym_long) VALUES
  ('Elevate Barbell', '2111 S College Ave, Fort Collins, CO 80526', 40.587440, -105.077499),
  ('Stone and Barbell Club', '7897 Mastin Drive, Overland Park, Kansas', 38.986060, -94.700960),
  ('Strong Barbell Club', '7932 N Oak Trafficway Suite 239, Kansas City, MO 64118', 39.238701, -94.576439);
INSERT INTO Gym_Equipment (equipment_gym, equipment_type, equipment_quantity) VALUES
  (1, 1, 4),
  (1, 2, 1),
  (1, 5, 100),
  (1, 8, 150),
  (2, 1, 3),
  (2, 2, 1),
  (2, 5, 50),
  (2, 4, 2),
  (3, 1, 3),
  (3, 8, 8);
INSERT INTO Gym_Extras (extra_gym, extra_type, extra_quantity) VALUES
  (1, 3, 1),
  (1, 1, 1),
  (2, 2, 1),
  (3, 1, 1),
  (3, 2, 1),
  (3, 3, 1);
