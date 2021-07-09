import readline from 'readline';
import { Command, CommandHandler, CommandRawHandler } from '../interfaces/CommandManager';

export const registeredCommands: CommandHandler[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function addCommand(rawHandlerData: CommandRawHandler) {
    const data: CommandHandler = {
        command: rawHandlerData.command,
        handler: rawHandlerData.handler,
        aliases: rawHandlerData.aliases || [],
        description: rawHandlerData.description || 'No description provided'
    };
    registeredCommands.push(data);
}

function findCommandObj(content: string): Command | null {
    const contentSplit = content.split(/\s+/);
    const executedCommand = contentSplit[0];
    contentSplit.shift();
    const args = contentSplit;
    for (const handlerObj of registeredCommands) {
        const command = handlerObj.command;
        const aliases = handlerObj.aliases;
        if (executedCommand === command) return { ...handlerObj, args };
        for (const alias of aliases) {
            if (executedCommand !== alias) continue;
            return { ...handlerObj, args };
        }
    }
    return null;
}

rl.on('line', (input) => {
    const commandHandler = findCommandObj(input);
    if (!commandHandler) return;
    const command = commandHandler.command;
    const args = commandHandler.args;
    commandHandler.handler(args, command);
});