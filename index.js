//dependencies//
//mysql//
var mysql = require("mysql2");
//inquirer//
var inquirer = require('inquirer');
require("console.table");
require("dotenv").config();
console.log(process.env)
console.log("Employee-Tracker-12")
const express = require('express')
//express app//
// connection //
const app = express();
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_tracker_db"
});

function start() {
    inquirer.prompt([
//options//
      {
 type: "list",
name: "nav",
message: "Edit database",
choices: [
"Add Department",
           
"Add Role",
            
"Add Employee",
            
"View All Employees",
           
"View All Roles",
           
"View All Departments",
            
"View All Employees By Department",
           
"Update Employee Role",
            
"Exit",
        ],
    },
])
.then(function (data) {
//switch//
 switch (data.nav) {
 case "Add Department":
 addDepartment();
break; case "Add Role":
addRole();
break; case "Add Employee":
 addEmployee();
break; case "View All Employees":
viewAllEmployees();
break; case "View All Roles":
viewAllRoles();
break; case "View All Departments":
viewAllDepartments();
break; case "View All Employees By Department":
viewEmployeeDepartment();
break; case "Update Employee Role":
updateEmployeeRole();
break; case "Quit":
quit();
break;
  }
})
//catch//
.catch(function (err) {console.log(err);
});
}
//adding a role//
function addRole() { console.log("------");
connection.query("SELECT * FROM department", 
function (err, res) {
if (err) throw err;
const myDeps = res.map(function 
(deps) {  return { 
name: deps.name,
value: deps.id 
};
});
//inquirer//  
inquirer
//questions//  
.prompt([
 {
 type: "input",
 name: "title",
 message: "New role Title"
},
 {
  type: "input",
  name: "salary",
 message: "New role salray"
 },
{
type: "list",
name: "department",
message: "New role department",
choices: myDeps
}
])
.then(function (data) {
connection.query("INSERT INTO role SET ?",
{
title: data.title,
salary: data.salary,
department_id: data.department,
},
function (err, res) {
if (err) throw err;
viewAllRoles()
            }
          );
        });
    });
  }
  
  function addDepartment() {
inquirer
//inquirer//  
prompt([
//navigation //
 {
type: "input",
name: "department",
message: "New department name",
},])
.then(function (data) {
connection.query(
"INSERT INTO department SET ?",
{
name: data.department
},
function(err, res){
if (err) throw err;
viewAllDepartments();
}
)
}) }
function quit() {
console.log("Exit");
connection.end();
}
function addEmployee() {
console.log("-----------");
connection.query("SELECT * FROM department", function (err, res) {
if (err) throw err;
const myDeps = res.map(function (deps) {
return { 
name: deps.name,
value: deps.id 
};
});
//inquirer//  
inquirer
.prompt([
{
type: "input",
name: "first_name",
message: "Employee's first name"},
{
type: "input",
name: "last_name",
message: "Employee's last name"
},
{
type: "list",
name: "department",
message: "Employee's department",
choices: myDeps
}
])
.then(function (data) {
const newEmp = data;
connection.query("SELECT * FROM role WHERE department_id ="+newEmp.department+"", function (err, res) {
if (err) throw err;
const myRole = res.map(function (roles) {
return { 
 name: roles.title,
value: roles.id 
};
});
  //inquirer//  
inquirer
.prompt([
{
type: "list",
name: "roles",
message: "Select a role for employee:",
choices: myRole
}
])
.then(function(data){
const newRole = data.roles;
connection.query("SELECT id,CONCAT(first_name, ' ', last_name) AS manager FROM employee", function(err, res){
if (err) throw err;
const myMan = res.map(function(man){
return {
name: man.manager,
value: man.id
}
})
//inquirer//  
inquirer
.prompt([
{
type: "list",
name: "manager",
message: "Select main Manager for the employee:",
choices: myMan
}
]).then(function(data){
connection.query(
"INSERT INTO employee SET ?",
{
first_name: newEmp.first_name,
last_name: newEmp.last_name,
role_id: newRole,
manager_id: data.manager 
}
//err//  
, function(err, res) {
if (err) throw err;
viewAllEmployees();
                      }
                    )
                  })
                })
              })
          })
        })
    });
  }