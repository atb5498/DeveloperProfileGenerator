const inquirer = require("inquirer");
// const fs = require("fs");
// const axios = require("axios");

inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your favorite color?",
        name: "color"
    }
])
// .then(function ({ username }) {
//         const gitUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//         axios.get(gitUrl).then(function (res) {
//             const profileDetails = res.data.map(function (profile) {
//                 return profile.name;
//             });

    //         const repoNamesStr = repoNames.join("\n");

    //         fs.writeFile("repos.txt", repoNamesStr, function (err) {
    //             if (err) {
    //                 throw err;
    //             }

    //             console.log(`Saved ${repoNames.length} repos`);
    //         });
    //     });
    // });
