const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
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
            choices: ["blue", "green", "red", "yellow", "cyan"]
        }
    ])
}



function generateHTML(data, answers) {
    const colors = {
        blue: {
            jumbotron: "#B9DBFF",
            buttonsCards: "primary"
        },
        green: {
            jumbotron: "#C4E7CC",
            buttonsCards: "success"
        },
        red: {
            jumbotron: "#F5C7CC",
            buttonsCards: "danger"
        },
        yellow: {
            jumbotron: "#FFEEBB",
            buttonsCards: "warning"
        },
        cyan: {
            jumbotron: "#BFE5EB",
            buttonsCards: "info"
        },
    }

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Developer Profile Generator</title>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
</head>
<body>
    <div class="jumbotron jumbotron-fluid" style="background-color: ${colors[answers.color].jumbotron};">
        <div class="text-center">
            <img src="${data.avatar}" class="rounded" alt="profile picture" style="max-height: 200px; border: solid 10px white;">
        </div>
        <div class="container text-center">
            <h1 class="display-4">${data.name}</h1>
            <p class="lead">${data.location}</p>
            <a class="btn btn-${colors[answers.color].buttonsCards}" href="${data.profileUrl}" target="_blank" role="button">GitHub</a>
            <a class="btn btn-${colors[answers.color].buttonsCards}" href="${data.blog}" target="_blank" role="button">Blog</a>
        </div>
    </div>
    <h2 class="text-center" style="margin-bottom: 50px;"></h2>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <div class="card text-white bg-${colors[answers.color].buttonsCards} mb-3 mx-auto" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Stars</h5>
                        <p class="card-text">${data.stars}</p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card text-white bg-${colors[answers.color].buttonsCards} mb-3 mx-auto" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Repositories</h5>
                        <p class="card-text">${data.repos}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <div class="card text-white bg-${colors[answers.color].buttonsCards} mb-3 mx-auto" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Followers</h5>
                        <p class="card-text">${data.followers}</p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card text-white bg-${colors[answers.color].buttonsCards} mb-3 mx-auto" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Following</h5>
                        <p class="card-text">${data.following}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

async function main() {
    const answers = await promptUser();

    const response = await axios.get(`https://api.github.com/users/${answers.username}`);

    const avatar = response.data.avatar_url;
    const name = response.data.name;
    const location = response.data.location;
    const profileUrl = response.data.html_url;
    const blog = response.data.blog;
    const bio = response.data.bio;
    const repos = response.data.public_repos;
    const followers = response.data.followers;
    const following = response.data.following;

    const response2 = await axios.get(`https://api.github.com/users/${answers.username}/starred`);

    const stars = response2.data.length;

    const data = { avatar, name, location, profileUrl, blog, bio, repos, followers, following, stars };

    const html = generateHTML(data, answers);
    return writeFileAsync("index.html", html);
}

main();
