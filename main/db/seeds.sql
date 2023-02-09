INSERT INTO department (name)
VALUES
  ('Enginering'),
  ('Support'),
  ('Web-Developement'),
  ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
  ("Lead Engineer", 180000, 1),
  ("Engineer", 100000, 1),
  ("Data Engineer", 120000, 1),
  ("Physical Engineer", 120000, 1),
  
  ("Support Manager", 120000, 2),
  ("Support help-desk", 70000, 2),
  ("Support Engineer", 90000, 2),

  ("Lead Web-Developer", 180000, 3),
  ("Senior Web-Developer", 110000, 3),
  ("Junior Web-Developer", 90000, 3),
  ("Server Engineer", 130000, 3),

  ("Sales Lead", 120000,4),
  ("Sales Person", 70000,4),
  ("Sales stategist", 90000,4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
-- manager ids of null are managers
  ('Bruh', 'Moment', 1, NULL),
  ('deez', 'Chan', 2, NULL),
  ('Ashley', 'Barnstormer', 3, NULL),
  ('The', 'LAW', 4, NULL),
-- these should all be eomployees under managers
  ('Malia', 'Brown', 1, NULL),
  ('Sarah', 'Lourd', 1, NULL),
  ('Milo', 'Cohen', 2, NULL),
  ('Gary', 'unknown', 2, NULL),
  ('Katy', 'TA', 3, NULL),
  ('Obama', 'Barrack', 3, NULL),
  ('Danny', 'nmoewfm', 4, NULL),
  ('iemf', 'scriddle', 4, NULL);
  