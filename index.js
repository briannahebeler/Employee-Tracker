var mysql = require("mysql");
var inquirer = require("inquirer");
const connection = require("./db/connection");
const logo = require("asciiart-logo");
var consoleTable = require("console.table");

init();

// Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();
    console.log(logoText);
    runSearch();
}

function runSearch() {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                "Exit"
            ]
        }
    ).then(function (answer) {
        console.log(answer);
        switch (answer.action) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Employees By Department":
                viewEmployeeByDepartment();
                break;
            case "View All Employees By Manager":
                viewEmployeeByManger();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Exit":
                console.log("Goodbye.");
                connection.end();
                break;
        }
    })
};

function viewDepartments() {
    connection.query(
        "select * from department",
        function (err, result) {
            if (err) throw err;
            console.log(result);
            runSearch();
        }
    )
};

function addDepartment() {
    inquirer.prompt(
        {
            name: "name",
            type: "input",
            message: "What is the name of the department you would like to add?"
        }).then(function (answer) {
            console.log("Inserting a new department...\n");
            connection.query(
                "insert into department set ?",
                {
                    name: answer.name
                },
                function (err) {
                    if (err) throw err;
                    console.log("Department created.\n");
                    viewDepartments();
                }
            )
        })
};

function removeDepartment() {

};

function viewRoles() {
    connection.query(
        "select * from role",
        function (err, result) {
            if (err) throw err;
            console.log(result);
            runSearch();
        }
    )
};

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the role you would like to add?"
        }, {
            name: "salary",
            type: "input",
            message: "What is the salary of the role you would like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the id of the department you would like to add the role to?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        console.log("Inserting a new role...\n");
        connection.query(
            "insert into role set ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err) {
                if (err) throw err;
                console.log("Role created.\n");
                viewRoles();
            }
        )
    })
};

function removeRole() {

};

function viewEmployees() {
    connection.query(
        "select * from employee",
        function (err, result) {
            if (err) throw err;
            console.log(result);
            runSearch();
        }
    )
};

function viewEmployeeByManger() {

};

function viewEmployeeByDepartment() {

};

function addEmployee() {

};

function updateEmployeeRole() {

};

function updateEmployeeManager() {

};

function removeEmployee() {

};