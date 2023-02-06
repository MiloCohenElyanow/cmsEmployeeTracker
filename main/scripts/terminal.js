import {dbTunnel} from "../db/connect.js";
const INQ = require("inquirer");
import main from "./main.js";


const mainMenu = async (select) => {
  switch(select){
    case "view_all_employees":
      await viewAllEmployees();
      break;
    case "view_employees_under_manager":
      await employeesUnderManager();
      break;
    case "view_employees_in_department":
      await employeesInDepartment();
      break;
    case "add_employee":
      await addEmployee();
      break;
    case "change_employee_role":
      await changeEmployeeRole();
      break;
    case "change_employee_manager":
      await changeEmployeeManager();
      break;
    case "view_roles":
      await viewRoles();
      break;
    case "add_new_role":
      await addNewRole();
      break;
    case "view_departments":
      await viewDepartments();
      break;
    case "employee_salaries":
      await employeeSalaries();
      break;
    case "add_new_department":
      await addNewDepartment();
      break;
    case "delete_employee":
      await deleteEmployee();
      break;
    case "delete_department":
      await deleteDepartment();
      break;
    case "exit":
      process.kill();
      break;
  }
};

//function to prompt user to continue in menu

const continueMenu = async () => {
  const resp = await INQ.prompt([
    {
      type:"confirm",
      message:"continue?",
      name:"continue",
    },
  ]);
  if (resp.continue){
    await main();
  }else{
    process.kill();
  }
};
//view all employees from database

const viewAllEmployees = async ()=> {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee maanger ON manager.id = employee.manager_id
  `;
  const [rows,fields] = await dbTunnel.execute(sql);
  console.table(rows);
  await continueMenu();
};

const employeesUnderManager = async ()=> {
  const sql = `SELECT * FROM employee`;
  const [rows,fields] = await dbTunnel.execute(sql)
  const managers = rows.map((manager) => {
    return {name: manager.first_name, value:manager.id};
  });
  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select a manager",
      choices:managers,
      name:"manager",
    },
  ]);
  const sql2 = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id
  WHERE manager.id = ?`;
  const [rows2,fields2] = await dbTunnel.execute(sql2, [resp.manager]);
  console.table(rows2);
  await continueMenu();
};

//view employees by department from database

const employeesInDepartment = async ()=> {
  const sql = "SELECT * FROM department";
  const [rows,fields] = await dbTunnel.execute(sql);
  const departments = rows.map((department) => {
    return {name:department.name, value:department.id};
  });

  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select department you want to see employees from",
      choices: departments,
      name:"department",
    },
  ]);

  const sql2 = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager

  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id
  WHERE department.id = ?`;
  const [rows2, fields2] = await dbTunnel.execute(sql2, [
    response.department,
  ]);
  console.table(rows2);
  await continueMenu();
}

