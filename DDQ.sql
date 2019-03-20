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
  equipment_category int,
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
INSERT INTO Equipment_Types (equipment_name, equipment_description) VALUES
  ('ER Rack', 'The best for meets'),
  ('Glute Ham Raise', 'Build them pork chords'),
  ('Reverse Hyperextension', null),
  ('Husafel Stones', null),
  ('Calibrated Plates, Powerlifting', null),
  ('Deadlift Bar', null),
  ('Squat Bar', null),
  ('Power Bar', null);
INSERT INTO Extras_Types (extra_name, extra_description) VALUES
  ('Turf', 'Great for athletes'),
  ('Benches', 'Great for sitting'),
  ('Loft', 'Fun times');
INSERT INTO Gyms (gym_name, gym_address, gym_lat, gym_long, gym_image) VALUES
  ('Elevate Barbell', '2111 S College Ave, Fort Collins, CO 80526', 40.587440, -105.077499, "https://static1.squarespace.com/static/5b3052557c9327f005315e1d/t/5c12ef580ebbe886df31118c/1544744822038/48371214_306262570229897_136233515065802752_n.jpg?format=1500w"),
  ('Stone and Barbell Club', '7897 Mastin Drive, Overland Park, Kansas', 38.986060, -94.700960, "https://mediaprocessor.websimages.com/width/220/crop/0,0,220x132/www.stoneandbarbellclub.com/12.jpg"),
  ('Strong Barbell Club', '7932 N Oak Trafficway Suite 239, Kansas City, MO 64118', 39.238701, -94.576439, "https://s3-media1.fl.yelpcdn.com/bphoto/lSJA-7op1VQ3ij-PuKIC2w/o.jpg");
INSERT INTO Gym_Equipment (equipment_gym, equipment_type, equipment_quantity) VALUES
  ((SELECT gym_id FROM Gyms WHERE gym_name='Elevate Barbell'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='ER Rack'), 4),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Elevate Barbell'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Glute Ham Raise'), 1),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Elevate Barbell'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Calibrated Plates, Powerlifting'), 4),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Elevate Barbell'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Power Bar'), 12),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Stone and Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='ER Rack'), 3),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Stone and Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Glute Ham Raise'), 1),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Stone and Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Calibrated Plates, Powerlifting'), 3),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Stone and Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Husafel Stones'), 3),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Strong Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='ER Rack'), 4),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Strong Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Glute Ham Raise'), 2),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Strong Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Reverse Hyperextension'), 1),
  ((SELECT gym_id FROM Gyms WHERE gym_name='Strong Barbell Club'), (SELECT equipment_id FROM Equipment_Types WHERE equipment_name='Squat Bar'), 3);
