# AWS Switch

Easily switch between AWS profiles.

## Description

This CLI tool provides a quick way to switch between different AWS profiles in your terminal

## Getting Started

### Installing

First you need to have [Deno](https://deno.land/manual/getting_started/installation) installed.

After that to install the cli tool:

```
deno install --unstable --allow-env=HOME,AWS_PROFILE,TERM_PROGRAM --allow-read="$HOME/.aws/config" --allow-write="$HOME/.aws-switch.sh" --name=aws-switch https://deno.land/x/aws_switcher/cli.ts
```

Add an alias to your bash:

```
alias awsp='aws-switch && source ~/.aws-switch.sh'
```

Thats it!

### Executing program

To switch AWS profile just run

```
awsp
```

and then select the profile you want from the select menu.

## License

MIT
