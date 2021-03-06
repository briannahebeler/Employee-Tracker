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
                // "View All Employees By Manager",
                "Add Employee",
                // "Remove Employee",
                "Update Employee Role",
                // "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                // "View the total utilized budget of a department",
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
            // case "View All Employees By Manager":
            //     viewEmployeeByManger();
            //     break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            // case "Update Employee Manager":
            //     updateEmployeeManager();
            //     break;
            // case "Remove Employee":
            //     removeEmployee();
            //     break;
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
            // case "View the total utilized budget of a department":
            //     viewBudget();
            //     break;
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
            console.table(result);
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
                    runSearch();
                }
            )
        })
};

//BONUS//
function removeDepartment() {
    connection.query(
        "select department.name FROM department",
        function (err, result) {
            if (err) throw err;
            console.log(result);
            var tempChoices = [];
            for (i = 0; i < result.length; i++) {
                tempChoices.push(result[i].name);
            };
            console.log(tempChoices);
            inquirer.prompt({
                name: "name",
                type: "list",
                message: "Which department would you like to remove?",
                choices: tempChoices
            }).then(function (answer) {
                connection.query(
                    "DELETE FROM department WHERE ?",
                    {
                        name: answer.name
                    },
                    function () {
                        console.log("Department removed.\n");
                        runSearch();
                    }
                )
            })
        }
    )
};

function viewRoles() {
    connection.query(
        "select * from role",
        function (err, result) {
            if (err) throw err;
            console.table(result);
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
                runSearch();
            }
        )
    })
};

//BONUS//
function removeRole() {
    connection.query(
        "select title FROM role",
        function (err, result) {
            if (err) throw err;
            console.log(result);
            var tempChoices = [];
            for (i = 0; i < result.length; i++) {
                tempChoices.push(result[i].title);
            };
            console.log(tempChoices);
            inquirer.prompt({
                name: "title",
                type: "list",
                message: "Which role would you like to remove?",
                choices: tempChoices
            }).then(function (answer) {
                console.log(answer)
                connection.query(
                    "DELETE FROM role WHERE ?",
                    {
                        title: answer.title
                    },
                    function () {
                        console.log("Role removed.\n");
                        runSearch();
                    }
                )
            })
        }
    )
};

function viewEmployees() {
    connection.query(
        "select * from employee",
        function (err, result) {
            if (err) throw err;
            console.table(result);
            runSearch();
        }
    )
};

// BONUS function viewEmployeeByManger() {
//     connection.query(
//         "select * from employee",
//         function (err, result) {
//             if (err) throw err;
//             console.log(result);
//             runSearch();
//         }
//     )
// };

function viewEmployeeByDepartment() {
    connection.query(
        "select name FROM department",
        function (err, result) {
            if (err) throw err;
            var depChoices = [];
            for (i = 0; i < result.length; i++) {
                depChoices.push(result[i].name);
            };
            // console.log(depChoices);
            inquirer.prompt({
                name: "name",
                type: "list",
                message: "Which department would you like to see employees for?",
                choices: depChoices
            }).then(function (answer) {
                // console.log("name:" + answer.name)
                connection.query(
                    "select employee.id, employee.first_name, employee.last_name, role.title, department.name from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id where department.name = ?",
                    answer.name,
                    function (err, result) {
                        if (err) throw err;
                        console.table(result);
                        runSearch();
                    }
                )
            })
        }
    )
};

function addEmployee() {
    connection.query(
        "select employee.id, first_name, last_name, role_id, title FROM employee inner join role on employee.role_id = role.id",
        function (err, result) {
            if (err) throw err;
            roleOpt = result.map((option) => {
                return option.role_id + " " + option.title
            })
            managerOpt = result.map((option) => {
                return option.id + " " + option.first_name + " " + option.last_name
            })

            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employees first name?"
                }, {
                    name: "last_name",
                    type: "input",
                    message: "What is the employees last name?",
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: roleOpt
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: managerOpt
                }
            ]).then(function (answer) {
                var str1 = answer.role_id;
                var chosenRole = str1.split(" ")
                console.log(chosenRole)
                var str2 = answer.manager_id;
                var chosenMan = str2.split(" ");
                console.log(chosenMan);
                console.log("Inserting a new employee...\n");
                connection.query(
                    "insert into employee set ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: chosenRole[0],
                        manager_id:chosenMan[0]
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Employee created.\n");
                        runSearch();
                    }
                )
            })
        }
    )
};

function updateEmployeeRole() {
    connection.query(
        "select employee.id, first_name, last_name, role_id, title FROM employee inner join role on employee.role_id = role.id",
        function (err, result) {
            if (err) throw err;
            employeeName = result.map((person) => {
                return person.id + " " + person.first_name + " " + person.last_name + ", " + person.title
            })
            role = result.map((person) => {
                return person.role_id + " " + person.title
            })
            inquirer.prompt([
                {
                    name: "name",
                    type: "list",
                    message: "Which employee would you like to update?",
                    choices: employeeName
                },
                {
                    name: "role",
                    type: "list",
                    message: "Which role would you like to update the employee with?",
                    choices: role
                }
            ]).then(function (answer) {
                var str1 = answer.name;
                var chosenEmp = str1.split(" ");
                console.log(chosenEmp);
                var str2 = answer.role;
                var chosenRole = str2.split(" ");
                console.log(chosenRole);
                connection.query(
                    "UPDATE employee SET role_id = ? WHERE id = ?",
                    [chosenRole[0], chosenEmp[0]],
                    function (err) {
                        if (err) throw err;
                        console.log("Employee updated. \n");
                        runSearch();
                    }
                )
            })
        }
    )
};

// BONUS function updateEmployeeManager() {

// };

// BONUS function removeEmployee() {
//     connection.query(
//         "select id, first_name, last_name FROM employee",
//         function (err, result) {
//             if (err) throw err;
//             employeeNames = result.map((person) => {
//                 return person.id + ": " + person.first_name + " " + person.last_name})
//             console.log(employeeNames);
//             inquirer.prompt({
//                 name: "name",
//                 type: "list",
//                 message: "Which employee would you like to remove?",
//                 choices: employeeNames
//             }).then(function(answer){
//                 console.log(answer)
//                 connection.query(
//                     "DELETE FROM employee WHERE id = ?",
//                     {
//                         //need to get just id from users choice
//                         id: answer.id
//                     },
//                     function() {
//                         console.log("Employee removed.\n");
//                         runSearch();
//                     }
//                 )
//             })
//         }
//     )
// };

//BONUS Function to - View the total utilized budget of a department//
// function viewBudget() {

// };