#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ pino-noir

		Options
			--file -f	Inspect a Log File (default: './*.log')
			--memory -m  the maximum number of lines to keep in memory (default: 1000)

		Examples
		  $ pino-noir --file=logs/pino.log
		  
	`,
	{
		importMeta: import.meta,
		flags: {
			file: {
				type: 'string',
				isRequired: false,
				default: 'logs/pino.log',
				shortFlag: 'f',
			},
			memory: {
				type: 'number',
				isRequired: false,
				default: 1000,
				shortFlag: 'm',
				hidden: true,
			},
		},
	},
);

render(<App file={cli.flags.file} memory={cli.flags.memory} />);
