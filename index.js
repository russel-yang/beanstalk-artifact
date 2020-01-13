const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('run beanstalk artifact action.');

  let dockerRun = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './Dockerrun.aws.json'))
  );
  const hash = core.getInput('hash');

  dockerRun['Image'][
    'Name'
  ] = `354767525209.dkr.ecr.us-west-1.amazonaws.com/t2gp-web:${hash}`;
  console.log(JSON.stringify(dockerRun));
  fs.writeFileSync('Dockerrun.aws.json', JSON.stringify(dockerRun));

  console.log('beanstalk artifact action done.');
} catch (error) {
  core.setFailed(error.message);
}
