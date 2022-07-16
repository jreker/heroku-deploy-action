const { execSync } = require("child_process");
const core = require("@actions/core");
const github = require('@actions/github');
const { Cipher } = require("crypto");


const HEROKU_API_KEY = core.getInput('HEROKU_API_KEY');
const APP_NAME = core.getInput('APP_NAME');
const ARTIFACT_NAME = core.getInput('ARTIFACT_NAME');
const MAIL = core.getInput('MAIL');

console.log("API_KEY ", HEROKU_API_KEY);
console.log("APP_NAME ", APP_NAME);
console.log("ARTIFACT_NAME ", ARTIFACT_NAME);
console.log("MAIL ", MAIL);



try {

    execSync(`cat >~/.netrc <<EOF
    machine api.heroku.com
        login ${MAIL}
        password ${HEROKU_API_KEY}
    machine git.heroku.com
        login ${MAIL}
        password ${HEROKU_API_KEY}
    EOF`);



    execSync("ls -la");

    execSync("heroku --version");

    execSync("heroku plugins:install java");

    execSync("export HEROKU_API_KEY=" + HEROKU_API_KEY);

    execSync("heroku create " + APP_NAME);

    execSync("heroku deploy:jar " + ARTIFACT_NAME + " --app " + APP_NAME);

} catch (error) {
    core.setFailed(error.message);
}