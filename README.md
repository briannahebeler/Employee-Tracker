# Employee Tracker

## Description
Node CLI
allows user to add and view departments, roles, employees and update employee roles. so that the user can organize and plan their bsiness
Content Management System 
managing a companies employees 
node inquirer MySQL

db- employee_tracker_db
tables
department:
id - INT PRIMARY KEY
name - VARCHAR(30) to hold department name
role:
id - INT PRIMARY KEY
title - VARCHAR(30) to hold role title
salary - DECIMAL to hold role salary
department_id - INT to hold reference to department role belongs to
employee:
id - INT PRIMARY KEY
first_name - VARCHAR(30) to hold employee first name
last_name - VARCHAR(30) to hold employee last name
role_id - INT to hold reference to role employee has
manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?
You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this.

Hints
You may wish to include a seed.sql file to pre-populate your database. This will make development of individual features much easier.
Focus on getting the basic functionality completed before working on more advanced features.
Review the week's activities for a refresher on MySQL.
Check out SQL Bolt for some extra MySQL help.

Bonus points if you're able to:
Update employee managers
View employees by manager
Delete departments, roles, and employees
View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Table of Contents  
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation
This generator requires the user to install node.js and then the inquirer, MySQL, and console.table packages.

## Usage 
Run the code through the terminal. Use the command "node server.js" to prompt the questions used to generate the Employee Tracker.
![](./assets/media/screenshot.png)
Checkout video of application here: 

## Contributing
To contribute to this project you can fork this GitHub repository.

## Questions
If you have any additional questions about this application you can reach out to me at briannahebeler@gmail.com.
You can check out some of my other projects at briannahebeler (https://github.com/briannahebeler).

