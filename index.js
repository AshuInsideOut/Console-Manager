const consoleManager = require('./managers/consoleManager');

function manager(options) {
    if (options && options.removeHelpCommand) {
        return consoleManager;
    }
    consoleManager.addCommand({
        command: 'help',
        handler: async () => {
            let description = '\n';
            consoleManager.allCommands.forEach(commandObj => description += `${commandObj.command} : ${commandObj.description}\n`);
            console.log('==============Commands==============');
            console.log(description);
            console.log('====================================');
        },
        description: 'Shows all the avaliable commands'
    });
    return consoleManager;
}

module.exports = manager;