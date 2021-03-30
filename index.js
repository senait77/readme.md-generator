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
            // {
            //     type: "input",
            //     name: "badge",
            //     message: "Please provide the badges links that you want"
            // },
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
                validate: installationInput => {
                    if (installationInput) {
                        return true;
                    } else {
                        console.log('You need to enter a project installation');
                        return false;
                    }
                    }
            },
            {
                type: "checkbox",
                name: "usage",
                message: 'What technologies did you use for your project? (Check all that apply).',
                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Node'],
                

            },
            {
                type: "checkbox",
                name: "license",
                message: "Please provide the project licence or your badge link",
                choices:['[![License: Apache](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n', '[![License: ligihblue](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)\n', '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n',  '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'],
                
            },
            {
                type: "input",
                name: "contributing",
                message: "Please provide the contributing parties"
            },
            {
                type: "input",
                name: "test",
                message: "Please provide your project walkthrough?"
                
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
                validate: usernameInput => {
                    if (usernameInput) {
                        return true;
                    } else {
                        console.log('You need to provide your username!');
                        return false;
                    }
                }
                
            },
            {
                type: "input",
                name: "email",
                message: "What is your email adress?",
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log('You nedd to enter your email adress!');
                        return false;
                    }
                }
                
            }

];

inquirer
.prompt(questions).then(data => {
        const queryUrl = `https://api.github.com/users/${data.username}`;
        
        axios.get(queryUrl).then(res => {

            const githubInfo = {
                githubImage: res.data.avatar_url,
                name: res.data.name,
                profile: res.data.html_url,
                email: res.data.email,
               
                
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
