import pino from 'pino';

const transport = pino.transport({
	target: 'pino/file',
	options: {destination: '../generated.log'},
});
const console = pino(
	{
		name: 'log-generator',
		level: 'trace',
		async: true,
		singleLine: true,
		timestamp: pino.stdTimeFunctions.epochTime,
	},
	transport,
);
