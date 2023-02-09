const INQ = require("inquirer");
import mainMenu from "./terminal"

const selectMenu = async () => {
  const resp = await INQ.prompt([
    {
      type:"list",
      message:"please select an action to perform",
      choices:[
        {
          name:"view all employees",
          values:"view_all_employees"
        },
        {
          name:"view employees under manager",
          value:"view_all_employees_by_manager"
        },
        {
          name:"view employees in department",
          value:"view_all_employees_in_department"
        },
        {
          name:"add Employee",
          value:"add_employee"
        },
        {
          name:"update employee role",
          value:"update_employee_role"
        },
        {
          name:"update employee manager",
          value:"update_employee_manager"
        },
        {
          name:"view all roles",
          value:"view_all_roles"
        },
        {
          name:"add role",
          value:"add_role"
        },
        {
          name:"view all departments",
          value:"view_all_departments"
        },
        {
          name:"add department",
          value:"add_department"
        },
        {
          name:"delete employee",
          value:"delete_employee"
        },
        {
          name:"delete role",
          value:"delete_role"
        },
        {
          name:"delete department",
          role:"delete_department"
        },
        {
          name:"exit",
          value:"exit"
        }
      ],
      name:"select",
    },
  ]);

  await mainMenu(resp.select);
};

module.exports = selectMenu;