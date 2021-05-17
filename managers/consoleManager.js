const readline = require('readline');
const colors = require('colors');

const registeredCommands = [];
const allCommands = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const logger = () => {
    const info = (message) => console.log('Console Manager'.green.bold, message.blue.bold);
    const warn = (message) => console.log('Console Manager'.green.bold, message.yellow.bold);
    const error = (message) => console.log('Console Manager'.green.bold, message.red.bold);
    return { info, warn, error };
};

function addCommand(handlerObj) {
    const regFailedTemplate = 'Failed to register a command. Reason: ';
    if (!handlerObj.command) return logger.warn(`${regFailedTemplate}provide a command property.`);
    if (!handlerObj.handler) return logger.warn(`${regFailedTemplate}provide a handler property.`);
    if (!handlerObj.aliases) handlerObj.aliases = [];
    if (!handlerObj.description) handlerObj.description = 'No description provided';
    const commandObj = {
        command: handlerObj.command,
        aliases: handlerObj.aliases,
        description: handlerObj.description
    };
    registeredCommands.push(commandObj);
    allCommands.push(handlerObj);
}

function findCommandObj(content) {
    for (const handlerObj of allCommands) {
        const command = handlerObj.command;
        const aliases = handlerObj.aliases || [];
        const contentSplit = content.split(/\s+/);
        const executedCommand = contentSplit[0];
        contentSplit.shift();
        const args = contentSplit;
        const obj = {
            handler: handlerObj.handler,
            args,
            command,
            aliases,
            description: handlerObj.description
        };
        if (executedCommand === command) return obj;
        for (const alias of aliases) {
            if (args[0] !== alias) continue;
            return obj;
        }
    }
}

rl.on('line', (input) => {
    const handlerObj = findCommandObj(input);
    if (!handlerObj) return;
    const command = handlerObj.command;
    const args = handlerObj.args;
    handlerObj.handler(command, args);
});

module.exports.addCommand = addCommand;
module.exports.init = init;
module.exports.allCommands = allCommands;