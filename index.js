const commandManager = require('./managers/commandManager');

function init(options) {
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
}

module.exports = {
    init,
    ...commandManager
};