import { Options } from './interfaces/Defaults';
import * as commandManager from './managers/commandManager';

export = {
    init(options: Options = { isHelpCommand: false }) {
        const { isHelpCommand = false } = options;
        if (!isHelpCommand) return;
        commandManager.addCommand({
            command: 'help',
            handler: () => {
                let description = '\n';
                commandManager.registeredCommands.forEach(commandObj => description += `${commandObj.command.padStart(5).padEnd(5)} : ${commandObj.description.padStart(5)}\n`);
                console.log('==============Commands==============');
                console.log(description);
                console.log('====================================');
            },
            description: 'Shows all the available commands'
        });
    },
    ...commandManager
};