# Console Manager

A library to manage and add console commands.
You can easily take command and arguments from command line.

# Support

Join our [Discord Server](http://discord.abdevs.org) for any support related queries.

# Setup

Install the library with `npm i @abdevs/console-manager`.

```js
const { addCommand, init } = require('@abdevs/console-manager');

addCommand({
  command: 'do-something',
  handler: async (args, command) => {
    //Do Something
  },
  description: 'This command does something',
  aliases: ['something-do'],
});

init({
  //Options
});
```

### Option Properties

| Property Name | Default |        Description         |
| ------------- | :-----: | :------------------------: |
| isHelpCommand |  false  | Add a default help command |

### Command Properties

| Property Name |         Default         |               Description                |
| ------------- | :---------------------: | :--------------------------------------: |
| command       |           \*            |    Command for the handler to execute    |
| handler       |           \*            | Function that will be execute on command |
| description   | No description provided |    String Description of the command     |
| aliases       |           []            |        String Array of as aliases        |

\* Property is required

# Terms and Conditions

This Repository only available for code look up and personal use.

You are not allowed to steal the code from this repository.
