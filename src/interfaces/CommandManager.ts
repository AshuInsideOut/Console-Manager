export interface CommandHandler {
    command: string;
    handler: (args: string[], command: string) => Promise<any> | any;
    description: string;
    aliases: string[];
}

export interface CommandRawHandler {
    command: string;
    handler: (args: string[], command: string) => Promise<any> | any;
    description?: string;
    aliases?: string[];
}

export interface Command extends CommandHandler {
    args: string[];
}