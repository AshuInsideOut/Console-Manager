import readline from 'readline';
import 'colors';
import { Command, CommandHandler, CommandRawHandler } from '../interfaces/CommandManager';

export const registeredCommands: CommandHandler[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: (line: string, callback) => {
        const parts = line.split(/\s+/g);
        const args = [...parts];
        args.shift();
        const command = parts[0];
        const commands: string[] = [];
        registeredCommands.forEach(c => {
            commands.push(c.command);
            commands.push(...c.aliases);
        });
        const call = (options: string[] = [], arg: string = line) => {
            const hits = options.filter(c => c.startsWith(arg)).map(c => `${c} `);
            callback(null, [hits.length ? hits : options, arg]);
        };
        if (parts.length <= 1) return call(commands);
        if (!commands.includes(command)) return call();
        const commandHandler = registeredCommands.find(c => c.command === command);
        if (!commandHandler) return call();
        const completers = commandHandler.completers;
        if (args.length > completers.length) return call();
        const completer = completers[args.length - 1];
        if (!completer) return call();
        const arg = args[args.length - 1];
        if (Array.isArray(completer)) return call(completer, arg);
        const result = completer(args[args.length - 1]);
        if (Array.isArray(result)) return call(result, arg);
        result.then(result => call(result, arg));
    }
});

export function addCommand(rawHandlerData: CommandRawHandler) {
    const data: CommandHandler = {
        command: rawHandlerData.command,
        handler: rawHandlerData.handler,
        aliases: rawHandlerData.aliases || [],
        description: rawHandlerData.description || 'No description provided',
        completers: rawHandlerData.completers || []
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