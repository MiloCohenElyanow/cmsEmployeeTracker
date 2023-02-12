# CMS-Employee_Tracker

## Description

  This is a CMS Employee Tracker application, CMS standing for Content Management System. The goal of this project is to create a user friendly way for people who arent familiar with database work specificly mysql to work with that mysql databas. This can be fairly easily achieved by using node:inquirer, node:mysql2, and node:console.table, inquirer will create a menu for the user to use to interact with the the code, the code will take the information given from inquirer and relate that inforation with/to the database and console.table with present that database information to the console in a user friendly manner. All in all this was a fairly simple project but long, and came with more than a couple bugs that took far to long to work out.

## Tech Stack
  
  -NODE: clear
  -NODE: console.table
  -NODE: figlet
  -NODE: inquirer
  -NODE: mysql2

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Tech_Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

please download source code or clone repo, before anything else, in the db folder of this project open the connect.js file and replace the information in dbTunnel to information that maches your mysql local host credentials, then open mysql workbench please run on your local host server schema.sql from the db folder, and under that paste seeds.sql if you want to use this application with prewritten information in your database. After that open that up in your favorite work space with node or terminal running with node, open up the project in that console and run npm i, that will download dependancies for this project, then all you have to do run is node server.js, and you would be able to see the application up and running

## Usage

  Do whatever you want bruh

## License

  bruh liscence

## Features

- responsive and interactive inquirer menu
- mysql database querying and manipulation

