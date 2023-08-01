import React from 'react';
import {Text, Box} from 'ink';
import Panels from './components/Panels.js';
import useStdoutDimensions from './hooks/use-stdout-dimensions.js';
import createLogger from './logger.js';


const console = createLogger('app');

export default function App() {
	const [columns, rows] = useStdoutDimensions();
	const dimensions = {width: columns, height: rows};

	return <Panels width={columns} height={rows}   />;
}
