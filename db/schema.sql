DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    --to hold department name--
    name VARCHAR(30)
);

DROP TABLE IF EXISTS role;

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    --to hold role title--
    title VARCHAR(30),
    --to hold role salary--
    salary DECIMAL,
    --to hold reference to department role belongs to--
    department_id INT
);


DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    --to hold employee first name--
    first_name VARCHAR(30),
    --to hold employee last name--
    last_name VARCHAR(30),
    --to hold reference to role employee has--
    role_id INT,
    --to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager--
    manager_id INT
);