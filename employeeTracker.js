var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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
                "view employee by manager",
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
            
        }
    })
};

function viewDepartments() {

};

function addDepartment() {

};

function deleteDepartment() {

};

function viewRoles() {

};

function addRole() {

};

function deleteRole() {

};

function viewEmployees() {

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
