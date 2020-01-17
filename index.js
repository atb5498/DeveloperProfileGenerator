const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

return inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["gray", "blue", "green", "red", "yellow", "cyan"]
    }
]).then(function ({ username }) {

    const gitUrl = `https://api.github.com/users/${username}`;

    axios.get(gitUrl).then(function (res) {
        console.log(res.data.avatar_url);
        console.log(res.data.name);
        console.log(res.data.location);
        console.log(res.data.url);
        console.log(res.data.blog);
        console.log(res.data.bio);
        console.log(res.data.public_repos);
        console.log(res.data.followers);
        console.log(res.data.following);
    });

    const gitStarredUrl = `https://api.github.com/users/${username}/starred`;

    axios.get(gitStarredUrl).then(function (res) {
        console.log(res.data.length);
    });
});

// function generateHTML(answers) {
// }

// async function init() {
//     try {
//     } catch (err) {
//         console.log(err);
//     }
// }

// init();
