const mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",

    database: "employee_tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch();
});

function runSearch() {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "view departments",
                "add department",
                "delete department",
                "view roles",
                "add role",
                "delete role",
                "view employees",
                "view employees by manager",
                "add employee",
                "update employee role",
                "update employee manager",
                "delete employee",
                "exit"
            ]
        }
    ).then(function(answer) {
        console.log(answer);
        switch (answer.action) {
            case "view departments":
                viewDepartments();
                break;
            case "add department":
                addDepartment();
                break;
            case "delete department":
                deleteDepartment();
                break;
            case "view roles":
                viewRoles();
                break;
            case "add role":
                addRole();
                break;
            case "delete role":
                deleteRole();
                break;
            case "view employees":
                viewEmployees();
                break;
            case "view employees by manager":
                viewEmployeeByManger();
                break;
            case "add employee":
                addEmployee();
                break;
            case "update employee role":
                updateEmployeeRole();
                break;
            case "update employee manager":
                updateEmployeeManager();
                break;
            case "delete employee":
                deleteEmployee();
                break;
            default:
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

};

function deleteDepartment() {

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

};

function deleteRole() {

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

function addEmployee() {

};

function updateEmployeeRole() {

};

function updateEmployeeManager() {

};

function deleteEmployee() {

};
