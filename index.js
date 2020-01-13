const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

try {
  console.log('run beanstalk artifact action.');

  let dockerRun = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './Dockerrun.aws.json'))
  );
  const hash = core.getInput('hash');
  const awsRegion = core.getInput('aws_region') || 'us-west-1';
  const repository = core.getInput('repository') || 't2gp-web';

  dockerRun['Image'][
    'Name'
  ] = `354767525209.dkr.ecr.${awsRegion}.amazonaws.com/${repository}:${hash}`;
  console.log(JSON.stringify(dockerRun));
  fs.writeFileSync('Dockerrun.aws.json', JSON.stringify(dockerRun));

  console.log('beanstalk artifact action done.');
} catch (error) {
  core.setFailed(error.message);
}
