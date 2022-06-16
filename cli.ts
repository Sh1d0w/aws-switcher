import { select } from './deps.ts';

const HOME = Deno.env.get('HOME');
const profileRegex = /\[profile .*]/g;
const bracketsRemovalRegx = /(\[profile )|(\])/g;
const defaultProfileChoice = 'default';

const awsConfigFile = `${HOME}/.aws/config`;
const awsSwitchConfig = `${HOME}/.aws-switch.sh`;

// Check if the aws config file exists
try {
	if (!Deno.statSync(awsConfigFile).isFile) {
		console.error(`${awsConfigFile} does not exist`);
		Deno.exit(1);
	}
} catch {
	console.error(`${awsConfigFile} does not exist`);
	Deno.exit(1);
}

const awsConfig = Deno.readTextFileSync(awsConfigFile);

const matches = awsConfig.match(profileRegex);

if (!matches) {
	console.log('No profiles found.');
	console.log(
		'Refer to this guide for help on setting up a new AWS profile:',
	);
	console.log(
		'https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html',
	);

	Deno.exit(1);
}

const profiles = matches.map((match) => {
	return match.replace(bracketsRemovalRegx, '');
});

if (!profiles.includes(defaultProfileChoice)) {
	profiles.push(defaultProfileChoice);
}

const ret = await select({
	message: 'Choose a profile',
	options: profiles,
	default: Deno.env.get('AWS_PROFILE') || defaultProfileChoice,
});

// Write to file
Deno.writeTextFileSync(awsSwitchConfig, `export AWS_PROFILE=${ret}`);

Deno.exit(0);
