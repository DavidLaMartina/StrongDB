/* Get data for individual gym */
SELECT * FROM Gyms WHERE gym_id = ?;

/* Get gyms data, including filters */
SELECT * FROM
  Gyms g RIGHT JOIN

/* Insert new gym into DB */
INSERT INTO Gyms (gym_name, gym_owner, gym_website, gym_instagram, gym_facebook, gym_phone, date_added) VALUES
  (?, ?, ?, ?, ?, ?, ?);

/* Select gyms based quantities of key equipment */
SELECT g.gym_id, g.gym_name FROM
  Gyms g LEFT JOIN
  Gym_Equipment ge ON g.gym_id = ge.equipment_gym LEFT JOIN
  Equipment_Types et ON ge.equipment_type = et.equipment_id WHERE
  g.gym_id IN (SELECT ge.equipment_gym FROM Gym_Equipment ge WHERE ge.equipment_type = 1) AND
  g.gym_id IN (SELECT ge.equipment_gym FROM Gym_Equipment ge WHERE ge.equipment_type = 2)
  GROUP BY g.gym_id;

/* Get list of possible equipment and max quantities */
SELECT * FROM Equipment_Types;

/* Select gym and everything a user would want from it
    WHERE clauses to be added dynamically later */
SELECT * FROM Gyms g WHERE g.gym_id = ?;

/* Get all equipment from specific gym */
SELECT et.equipment_id, et.equipment_name, ge.equipment_quantity FROM
  (SELECT gym_id FROM Gyms WHERE gym_id = ?) as g LEFT JOIN
  Gym_Equipment ge ON g.gym_id = ge.equipment_gym LEFT JOIN
  Equipment_Types et ON ge.equipment_type = et.equipment_id;

/* Add equipment to gym (inserting into relationship table) */
INSERT INTO Gym_Equipment (equipment_gym, equipment_type, equipment_quantity) VALUES
  (?, ?, ?,),
  (?, ?, ?,),
