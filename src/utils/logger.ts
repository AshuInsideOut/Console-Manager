import 'colors';

function info(message: string) {
    console.log('[INFO]'.blue, '[Console Manager]'.green, message.blue);
}

function error(message: string) {
    console.log('[ERROR]'.red, '[Console Manager]'.green, message.red);
}

function warn(message: string) {
    console.log('[WARN]'.yellow, '[Console Manager]'.green, message.yellow);
}

export default {
    info,
    warn,
    error
};