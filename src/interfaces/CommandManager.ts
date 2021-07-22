export interface CommandHandler {
    command: string;
    handler: (args: string[], command: string) => Promise<any> | any;
    description: string;
    aliases: string[];
    completers: CompleteHandler[];
}

export interface CommandRawHandler {
    command: string;
    handler: (args: string[], command: string) => Promise<any> | any;
    description?: string;
    aliases?: string[];
    completers?: CompleteHandler[];
}

type CompleteHandler = ((arg: string) => Promise<string[]> | string[]) | string[];

export interface Command extends CommandHandler {
    args: string[];
}