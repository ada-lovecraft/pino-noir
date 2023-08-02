import {createContext} from 'react';
import {defaultMarker} from './constants.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LogListItemContext = createContext({
	marker: defaultMarker,
});
