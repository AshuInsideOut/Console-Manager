const consoleManager = require('./managers/commandManager');

module.exports.init = options => {
    if (options && options.removeHelpCommand) return commandManager;
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
    return commandManager;
};
module.exports.commandManager = commandManager;