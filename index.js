const { execSync } = require("child_process");
const core = require("@actions/core");
const github = require('@actions/github');


const HEROKU_API_KEY = core.getInput('HEROKU_API_KEY');
const APP_NAME = core.getInput('APP_NAME');
const ARTIFACT_NAME = core.getInput('ARTIFACT_NAME');
const MAIL = core.getInput('MAIL');

console.log("API_KEY ", HEROKU_API_KEY);
console.log("APP_NAME ", APP_NAME);
console.log("ARTIFACT_NAME ", ARTIFACT_NAME);
console.log("MAIL ", MAIL);



function addHerokuGitRemote() {

    try{
        execSync("heroku git:remote --app " + APP_NAME);
        console.log("Added heroku remote repo");
    }catch(error) {
        console.log("WARNING: Cannot add remote repo");
        execSync("heroku create " + APP_NAME);
        console.log("Created heroku app " + APP_NAME);
    }


}



try {

    execSync(`cat >~/.netrc <<EOF
    machine api.heroku.com
        login ${MAIL}
        password ${HEROKU_API_KEY}
    machine git.heroku.com
        login ${MAIL}
        password ${HEROKU_API_KEY}
    EOF`);

    execSync("export HEROKU_API_KEY=" + HEROKU_API_KEY);

    execSync("heroku --version");

    addHerokuGitRemote();
    
    execSync("git push heroku master");
} catch (error) {
    
    execSync("heroku create " + APP_NAME);
    core.setFailed(error.message);
}