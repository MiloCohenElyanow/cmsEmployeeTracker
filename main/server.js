//PHAM CONG HELPED ME MAKE THIS WELCOME PAGE WITH FIGLET!!!
import clear from "clear";
import figlet from "figlet";
// const selectMenu = require("./scripts/main.js")
// import selectMenu from "./scripts/main.js"
import selectMenu from "./scripts/main.js";


const welcome = async () =>{
  clear(); // just want the console to clear everytime this application is ran
  console.log("\n")
  console.log("##====================--====================## \n")
  console.log(figlet.textSync("Employee", {
    font:"Star Wars",
    horizontalLayout:"fitted",
    verticalLayout:"fitted",
  }));
  console.log(figlet.textSync("Tracker", {
    font:"Star Wars",
    horizontalLayout:"fitted",
    verticalLayout:"fitted"
  }), "\n");
  console.log("##====================--====================##");
};

const init = async ()=> {
  console.log("in init")
  await welcome();
  console.log("awaiting welcome")
  await selectMenu();
  console.log("awaiting mainMenu")
};

init();