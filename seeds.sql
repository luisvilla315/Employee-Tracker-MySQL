/* use */
USE employees_db;

INSERT INTO department
/* department */
 (name)
 /* adding values */
VALUES
('Engineering'),
('sales'),
('CEO'),
('Stack'),
('support');
INSERT INTO employee
/* create empolyees */
 (first_name, last_name, 
role_id, manager_id)
VALUES
 ('James', 'Keith', 1, NULL),
 ('Taylor', 'roth', 2, NULL),
('Michael', 'Vincen', 3, 1),
 ('Kevin ', 'white', 4, NULL),
('Riley', 'Hendson', 5, 4),
('Devon', 'roland', 6, NULL),
 ('Tim', 'biden', 7, NULL),
 ('Brian', 'Walts', 8, 7);
 INSERT INTO role
 (title, salary,
 department_id)
 /* create roles */
VALUES
('Sales manager', 20000, 4),
('Sales associate', 10000, 4),
('AI Engineer', 25000, 1),
('Web Engineer', 10000, 1),
('consultant', 60000, 2),
('Accountant', 20000, 2),
('sales Lead', 70000, 3),
('CEO', 100000, 3);
 SELECT department.id, department.name 
 FROM department ORDER BY department.id;
 SELECT role.id, role.title, role.salary 
 FROM role ORDER BY role.id;
 SELECT * FROM employee;
SELECT first_name, last_name, role_id
 FROM employee WHERE employee.id = 4;
ELECT employee.id, employee.first_name, 
employee.last_name, role.title, 
department.name AS department, role.salary, 
CONCAT(manager.first_name, ' ',
 manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager on manager.id = employee.manager_id
INNER JOIN role ON (role.id = employee.role_id)
INNER JOIN department ON (department.id = role.department_id)
ORDER BY employee.id;