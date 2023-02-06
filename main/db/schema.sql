DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- creating department table, departments will also be accesable by id
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);
-- creating role table
CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  -- salary can have 10 numbers before decimal and 2 after
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id),
  -- linking department id to this role id
  FOREIGN KEY(department_id) REFERENCES department(id),
  -- on delete, cascade into table, so this allows deleting items and properties in table not just the entire table
  ON DELETE CASCADE -- this has been causing me errors in workbench see if it works using mysql2

);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  -- adding first name and last name for employees
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  -- role id corresponds to role, as in job
  role_id INT NOT NULL,
  -- thier managers personal id
  manager_id INT,
  PRIMARY KEY(id),
  -- can be referenced with role id(those in specific role, will be accesible by querying that role)
  FOREIGN KEY (role_id) REFERENCES role(id),
  -- can be referend with manager id(those with specific manager, will be accesible by querying that manager id)
  FOREIGN KEY(manager_id) REFERENCES employee(id),
  ON DELETE CASCADE


);