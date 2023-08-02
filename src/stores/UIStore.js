import {Subject} from 'rxjs';
const subject = new Subject();

const initialState = {
	activeView: 'log-list',
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
	focus: viewName => {
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
