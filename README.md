bytebin-cli
===========

CLI for Bytebin

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bytebin-cli.svg)](https://npmjs.org/package/bytebin-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bytebin-cli.svg)](https://npmjs.org/package/bytebin-cli)
[![License](https://img.shields.io/npm/l/bytebin-cli.svg)](https://github.com/alexy4744/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bytebin-cli
$ bytebin COMMAND
running command...
$ bytebin (-v|--version|version)
bytebin-cli/0.0.0 win32-x64 node-v14.5.0
$ bytebin --help [COMMAND]
USAGE
  $ bytebin COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bytebin hello [FILE]`](#bytebin-hello-file)
* [`bytebin help [COMMAND]`](#bytebin-help-command)

## `bytebin hello [FILE]`

describe the command here

```
USAGE
  $ bytebin hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ bytebin hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/alexy4744/cli/blob/v0.0.0/src\commands\hello.ts)_

## `bytebin help [COMMAND]`

display help for bytebin

```
USAGE
  $ bytebin help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_
<!-- commandsstop -->
