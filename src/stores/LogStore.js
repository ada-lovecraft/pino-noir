import TailFile from '@logdna/tail-file';
import jsonlParser from 'stream-json/jsonl/Parser.js';
import {tokenize} from '@humanwhocodes/momoa';
import Chain from 'stream-chain';
import {Subject} from 'rxjs';
import createLogger from '../logger.js';
import {inspect} from 'util';
const console = createLogger('LogStore');

const subject = new Subject();

const initialState = {
	models: [],
	views: [],
	selected: {model: null, view: null},
	hovered: {model: null, view: null},
	filter: d => true,
	selectedIndex: null,
};
let state = initialState;
const setState = nv => {
	const ov = state;
	if (nv !== ov) {
		state = nv;
		// console.log({nv: nv.views.length}, 'store-set-state');
		subject.next(state);
	}
};

const logStore = {
	init: () => {
		setState(initialState);
		console.log('store-init');
		tail.start();
		subject.next(state);
	},
	subscribe: stateSetter => {
		subject.subscribe(stateSetter);
	},
	addLine: ({model, view}) => {
		setState({
			models: [...state.models, model],
			views: [...state.views, view],
		});
		// console.trace(
		// 	{
		// 		models: state.models.length,
		// 		views: state.views.length,
		// 	},
		// 	'add-line',
		// );
	},
	select: id => {
		const selectedIndex = state.views.findIndex(v => v.id === id);
		const selected = {
			model: state.models[selectedIndex],
			view: state.views[selectedIndex],
		};
		setState({...state, selected, selectedIndex});
	},
	hover: id => {
		const hoveredIndex = state.views.findIndex(v => v.id === id);
		const hovered = {
			model: state.models[hoveredIndex],
			view: state.views[hoveredIndex],
		};

		setState({...state, hovered, hoveredIndex});
		console.info(
			{id, hoveredIndex: state.hoveredIndex, hovered: state.hovered},
			'store-hover',
		);
	},

	clear: () => {
		setState(initialState);
	},
	filter: filterfn => {
		setState({filter: filterfn});
		console.info({filterfn}, 'store-filter');
	},

	clearFilter: () => {
		setState({filter: initialState.filter});
		console.info({filterfn}, 'store-clear-filter');
	},
	initialState,
};

function prepareModel(data) {
	const id = data.key;
	const model = {
		id,
		data: data.value,
	};
	return model;
}

function prepareView(model) {
	const view = {
		id: model.id,
		data: extractDisplay(model.data),
		ast: tokenize(JSON.stringify(model.data)),
	};
	return view;
}

const tail = new TailFile(process.env.LOG_FILE, {
	startPos: 0,
	pollFileIntervalMs: 1000,
});

const parser = jsonlParser.parser();
const pipeline = new Chain([
	parser,

	data => {
		// console.trace({ data }, 'pipeline-tick')
		const model = prepareModel(data);
		const view = prepareView(model);

		logStore.addLine({model, view});
	},
]);

tail.pipe(pipeline);

pipeline.on('end', () => {
	console.log('pipeline-end');
});

tail
	.on('tail_error', err => {
		console.error(err, 'TailFile had an error!');
		throw err;
	})
	.on('close', () => {
		console.warn('TailFile closed');
	});
// 	.start()
// 	.catch(err => {
// 		console.error(err, 'Cannot start.  Does the file exist?');
// 		throw err;
// 	});

function extractDisplay(data) {
	const extracted = {
		timestamp: data.time,
		level: data.level,
		msg: data.msg,
		eventName: data.event,
	};

	const levelName = lookupLevelName(extracted.level);
	const displayData = [
		'level',
		'time',
		'pid',
		'hostname',
		'name',
		'msg',
		'id',
	].reduce(
		(acc, key) => {
			delete acc[key];
			return acc;
		},
		{...data.value},
	);

	const display = {
		key: data.key,
		time: {
			addedAt: Date.now(),
			iso: new Date(extracted.timestamp).toISOString(),
			short: new Date(extracted.timestamp).toISOString().split(/[TZ]/g)[1],
		},
		msg: extracted.msg,
		eventName: extracted.eventName,
		inspect: inspect(data, {depth: 2, colors: true}),
		data: displayData,
		level: {
			name: levelName.toUpperCase().padStart(5, ' '),
			style: lookupLevelStyle(levelName),
		},
	};

	return display;
}

const lookupLevelName = level =>
	({
		10: 'trace',
		20: 'debug',
		30: 'info',
		40: 'warn',
		50: 'error',
		60: 'fatal',
	}[level] || 'user');

const lookupLevelStyle = levelName =>
	({
		trace: {color: 'dim'},
		debug: {color: 'subtle'},
		info: {color: 'blue'},
		warn: {color: 'yellow'},
		error: {color: 'red'},
		fatal: {color: 'magenta', inverted: true},
		user: {color: 'green'},
	}[levelName]);
export default logStore;
