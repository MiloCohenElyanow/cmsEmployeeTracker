// import {dbTunnel} from "../db/connect.js";
const {dbTunnel} = require("../db/connect.js")
const INQ = require("inquirer");


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
    case "department_salaries":
      await departmentSalaries();
      break;
    case "add_new_department":
      await addNewDepartment();
      break;
    case "delete_employee":
      await deleteEmployee();
      break;
    case "delete_role":
      await deleteRole();
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
      message:"continue? ",
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
      message:"select a manager: ",
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
      message:"select department you want to see employees from: ",
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
};

//add employee, inquirer wil get name role and their mananger name, and add them to the db accordingly

const addEmployee = async ()=> {
  const sql = "SELECT * FROM role";
  const [rows,fields] = await dbTunnel.execute(sql);
  const roles = rows.map((role) => {
    return {name: role.title, value:role.id};
  });
  const sql2 = "SELECT * FROM employee";
  const [rows2,fields2] = await dbTunnel.execute(sql2);
  const managers = rows2.map((manager) => {
    return{name:manager.first_name, value:manager.id};
  });
  //add option to not ad a maanger 
  managers.push({name:"No Manager", value:null});

  const resp = await INQ.prompt([
    {
      type:"input",
      message:"enter Employees first name: ",
      name:"first_Name"
    },
    {
      type:"input",
      message:"enter Employees last name: ",
      name:"last_name",
    },
    {
      type:"list",
      message:"select employees role: ",
      choices:roles,
      name:"role_id",
    },
    {
      type:"list",
      message:"select Employees manager: ",
      choices:managers,
      name:"manager_id",
    }
  ]);

  const sql3 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  const params = [
    resp.first_name,
    resp.last_name,
    resp.role_id,
    resp.manager_id,
  ];
  const[rows3,fields3] = await dbTunnel.execute(sql3, params);
  console.log("##=========== Employee Added ===========##");
  await continueMenu();
};

const changeEmployeeRole = async ()=> {
  const sql = "SELECT * FROM employee";
  const [rows,fields] = await dbTunnel.execute(sql);
  const employees = rows.map((employee) => {
    return {name:employee.first_name, value:employee.id};
  });

  const sql2 = "SELECT * FROM role";
  const[rows2,fields2] = await dbTunnel.execute(sql2);
  const roles = rows2.map((role)=> {
    return { name: role.title, value: role.id};
  });

  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select employee: ",
      choices:employees,
      name:"employee_id",
    },
    {
      type:"list",
      message:"select employees new role: ",
      choices:roles,
      name: "role_id"
    },
  ]);

  const sql3 = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [resp.role_id, resp.employee.id];
  const [rows3,fields3] = await dbTunnel.execute(sql3, params);
  console.log("##=========== Employee Role updated Succesfully ===========##");
  await continueMenu();
};

//update employee manager, inquire user to give manager for employee

const changeEmployeeManager = async ()=>{
  const sql = `SELECT * FROM employee`;
  const [rows,fields] = await dbTunnel.execute(sql);
  const employees = rows.map((employee) => {
    return {name: employee.first_name, value:employee.id};
  });
  const sql2 = `SELECT * FROM employee`;
  const [rows2,fields2] = await dbTunnel.execute(sql2);
  const managers = rows2.map((manager) => {
    return {name:manager.first_name, value: manager.id};
  });

  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select employee: ",
      choices:employees,
      name:"employee_id"
    },
    {
      type:"list",
      message:"select employees new manager: ",
      choices: managers,
      name: "manager_id"
    }
  ]);
  const sql3 = `UPDATE employee SET manager_id = ? WHERE id = ?`;
  const params = [resp.manager._id, resp.employee_id];
  const [rows3,fields3] = await dbTunnel.execute(sql3, params);
  console.log("##=========== Employees manager updated ===========##");
  await continuePrompt();
};

//view all rows in db

const viewRoles = async() => {
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary
  FROM role
  LEFT JOIN department ON role.department_id = department.id`;
  const [rows,fields] = await dbTunnel.execute(sql);
  console.table(rows);
  await continueMenu();
};

//add role to db, inq will get title salary and department
const addNewRole = async () => {
  const sql = `SELECT * FROM department`;
  const [rows,fields] = await dbTunnel.execute(sql);
  const departments = rows.map((department) => {
    return {name:department.name, value:department.id};
  });

  const resp = await INQ.prompt([
    {
      type:"input",
      message:"Enter role title: ",
      name:"title"
    },
    {
      type:"input",
      message:"Enter role salary: ",
      name: "salary",
    },
    {
      type:"list",
      message:"select role department: ",
      choices: departments,
      name:"department_id",
    }
  ]);

  const sql2 = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  params = [resp.title, resp.salary, resp.department_id];
  const [rows2,fields2] = await dbTunnel.execute(sql2, params);
  console.log("##=========== Role added ===========##");
  await continueMenu();
};

//view all departments in db

const viewDepartments = async ()=>{
  const sql = `SELECT * ALL department`;
  const [rows,fields] = await dbTunnel.execute(sql);
  console.table(rows);
  await continueMenu();
};

//view department total salaries
const departmentSalaries = async ()=>{
  const sql = `SELECT * FROM department`;
  const [rows,fields] = await dbTunnel.execute(sql);
  const departments = rows.map((department) => {
    return {name:department.name, value:department.id};
  });
  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select department: ",
      chpoces:departments,
      name:"departments_id"
    }
  ]);
  const sql2 = `SELECT department.name AS department, SUM(role.salary) AS total_salary, COUNT(employee.id) as total_employees
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  WHERE department.id = ?
  GROUP BY department.name`;
  const params = [resp.department_id];
  const [rows2,fields2] = await dbTunnel.execute(sql2,params);
  console.table(rows2);
  await continueMenu();
};

//add department to db
const addNewDepartment = async ()=>{
  const resp = await INQ.prompt([
    {
      type:"input",
      message:"enter department name you want to add to departments: ",
      name:"name",
    }
  ]);

  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [resp.names];
  const [rows,fields] = await dbTunnel.execute(sql,params);
  console.log("##=========== Department added ===========##");
  await continueMenu();
};

//delete employee from db
const deleteEmployee = async ()=>{
  const sql = `SELECT * FROM employee`;
  const [rows,fields] = await dbTunnel.execute(sql);
  const employees = rows.map((employee) => {
    return {name:employee.first_name, value:employee.id};
  });

  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select an employee to delete, THIS IS PERMANENT",
      choices:employees,
      name:"employees_id"
    },
    {
      type:"confirm",
      message:"are you sure you want to proceed? THIS IS PERMANENT!",
      name:"confirm",
      default:false
    }
  ]); // this should always need a confirm since it is permanent
  //logic for confirm
  if (!resp.confirm) {
    console.log("##=========== Delete aborted ===========##")
  } else{
    const sql2 = `DELETE FROM employee WHERE id = ?`;
    const params = [resp.employee_id];
    const [rows2,fields2] = await dbTunnel.execute(sql2,params);
    console.log("##=========== Delete Complete ===========##");
  }
  await continueMenu();
};

//delete role from db
const deleteRole = async () => {
  const sql = `SELECT * FROM role`;
  const [rows,fields] = await dbTunnel.execute(sql);
  const roles = rows.map((role) => {
    return {name:role.title, value:role.id};
  });

  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select role to delete: ",
      choices:roles,
      name:"role_id"
    },
    {
      type:"confirm",
      message:"are you sure you want to delete this role? THIS IS PERMANENT",
      name:"confirm",
      default:false,
    }
  ]);
  //logic for confirm delete of department
  if(!resp.confirm){
    console.log("##=========== Role delete aborted ===========##")
  } else{
    //delete all employees under role first
    const sql1 = `DELETE FROM employee Where rold_id = ?`;
    const params1 = [resp.role_id];
    const [rows1,fields1] = await dbTunnel.execute(sql1,params1);
    // then delete the role
    const sql2 = `DELETE FROM role WHERE id = ?`;
    const params = [resp.role_id];
    const [rows2,fields2] = await dbTunnel.execute(sql2,params);
    console.log("##=========== Role delete complete ===========##");
  }
  await continueMenu();
};

// delete department from db by department name

const deleteDepartment = async()=>{
  const sql = `SELECT * FROM department`;
  const[rows,fields]=await dbTunnel.execute(sql);
  const departments = rows.map((department)=>{
    return{name:department.name,value:department.id};
  });
  const resp = await INQ.prompt([
    {
      type:"list",
      message:"select department to delete: ",
      choices:departments,
      name:"department_id"
    },
    {
      type:"confirm",
      message:"are you sure you want to proceed? ",
      name:"confirm",
      default:false
    }
  ]);

  //logic for the confirm
  if(!resp.confirm){
    console.log("##=========== Department delete aborted ===========##")
  } else {
    const sql1 = `DELETE FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)`;
    const params1 = [resp.department_id];
    const[rows1,fields1] = await dbTunnel.execute(sql1,params1);
    //delete roles in department
    const sql2 = `DELETE FROM role WHERE department_id = ?`;
    const params2 = [resp.department_id];
    const [rows2,fields2] = await dbTunnel.execute(sql2,params2);
    //finally delete department
    const sql3 = `DELETE FROM department WHERE id = ?`;
    const params3 = [resp.department_id];
    const [rows3,fields3] = await dbTunnel.execute(sql3,params3);
    console.log("##=========== Department delete complete ===========##");
  }
  await continueMenu();
}

module.exports = mainMenu;