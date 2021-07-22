import readline from 'readline';
import 'colors';
import { Command, CommandHandler, CommandRawHandler } from '../interfaces/CommandManager';

export const registeredCommands: CommandHandler[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: (line: string) => {
        const commands: string[] = [];
        registeredCommands.forEach(c => {
            commands.push(c.command);
            commands.push(...c.aliases);
        });
        const hits = commands.filter(c => c.startsWith(line));
        return [hits.length ? hits : commands, line];
    }
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
    const executedCommand = contentSplit[0].toLowerCase();
    contentSplit.shift();
    const args = contentSplit;
    for (const handlerObj of registeredCommands) {
        const command = handlerObj.command.toLowerCase();
        const aliases = handlerObj.aliases.map(alias => alias.toLowerCase());
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
    if (!commandHandler) return console.log('[ERROR]'.red, 'Invalid command. Type "help" for all commands.');
    const command = commandHandler.command;
    const args = commandHandler.args;
    commandHandler.handler(args, command);
});