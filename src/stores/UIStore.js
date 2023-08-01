import {Subject} from 'rxjs';
const subject = new Subject();

const initialState = {
	activeView: 'logs',
};
let state = initialState;

const uiStore = {
	init: () => {
		state = {...state};
		subject.next(state);
	},
	subscribe: setState => {
		subject.subscribe(setState);
	},
	setFocus: viewName => {
		state = {
			activeView: viewName,
		};
		subject.next(state);
	},
	clear: () => {
		state = {...initialState};
	},
	initialState,
};

export default uiStore;
