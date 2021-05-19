const commandManager = require('./managers/commandManager');

module.exports.init = options => {
    if (options && options.removeHelpCommand) return commandManager;
    commandManager.addCommand({
        command: 'help',
        handler: async () => {
            let description = '\n';
            commandManager.allCommands.forEach(commandObj => description += `${commandObj.command} : ${commandObj.description}\n`);
            console.log('==============Commands==============');
            console.log(description);
            console.log('====================================');
        },
        description: 'Shows all the avaliable commands'
    });
    return commandManager;
};
module.exports.commandManager = commandManager;