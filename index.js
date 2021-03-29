// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const generate = require('./utils/generateMarkdown')


// TODO: Create an array of questions for user input
const questions = [{
    type: "input",
    name: "title",
    message: "What is your project title?",
    validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('You need to enter a project name!');
          return false;
        }
      }

},
{
    type: "input",
    name: "badge",
    message: "Please provide the badges links that you want"
},
{
    type: "input",
    name: "description",
    message: "Please provide your project's description",
    validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('You need to enter a project description!');
          return false;
        }
      }
},
{
    type: "input",
    name: "installation",
    message: "Please provide the installation instructions",
    validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
},
{
    type: "input",
    name: "languages",
    message: 'What did you this project with? (Check all that apply).',
    choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Node'],

},
{
    type: "input",
    name: "licence",
    message: "Please provide the project licence or your badge link",
    //choices:['![MIT](/apm/l/:packageName)','![Apache](/aur/license/:packageName)', '![GPL](/eclipse-marketplace/l/:name)','![Apache 2](/hexpm/l/:packageName)']
},
{
    type: "input",
    name: "contributing",
    message: "Please provide the contributing parties"
},
{
    type: "input",
    name: "test",
    message: "Please provide the project tests"
},

{
    type: "input",
    name: "repo",
    message: "Enter your gitHub link to your project. (Required).",
    validate: linkInput => {
        if (linkInput) {
            return true;
        } else {
            console.log('You nedd to enter a project GitHub link!');
            return false;
        }
    }
},
{
    type: "input",
    name: "username",
    message: "What is your github user name?",
    
},
];

inquirer
.prompt(questions).then(data => {
        const queryUrl = `https://api.github.com/users/${data.username}`;
        
        axios.get(queryUrl).then(res => {

            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };

            fs.writeFile('README.md', generate(data, githubInfo), err =>{
                if (err) {
                    throw err;
                };

                console.log('YAY! New README file has been created with success!');
            });
        });
})
.catch(err => {
    console.log(err)
})

// TODO: Create a function to write README file
//function writeToFile(fileName, data) {} 

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
