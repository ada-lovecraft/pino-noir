import pino from 'pino';

const loggerOpts = {
	name: 'noir',
	level: 10,
	timestamp: pino.stdTimeFunctions.epochTime,
	async: true,
};

// pino file transport
const transport = pino.transport({
	target: 'pino/file',
	options: {destination: `pino-noir.log`, mkdir: true},
});

let logger = pino(loggerOpts, transport);

export default childName => {
	const child = logger.child(
		{
			module: childName,
		},
		{
			serializers: {
				err: pino.stdSerializers.err,
			},
		},
	);
	child.log = child.info;
	return child;
};
