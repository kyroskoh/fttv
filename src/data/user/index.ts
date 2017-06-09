import { MiddlewareAPI } from "redux";
import { ActionsObservable } from "redux-observable";

import { getUser } from "common/twitch-api";
import { State as GlobalState } from "data";
import { add as addError } from "data/errors";

import { Action, ActionTypes, requestDetails, setDetails } from "./actions";
import { State } from "./model";

const initialState: State = {
	scope: []
};

export const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.SET_ACCESS_TOKEN: {
			return { ...state, accessToken: action.payload.accessToken };
		}

		case ActionTypes.SET_DETAILS: {
			return { ...state, details: action.payload.details };
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<Action>, store$: MiddlewareAPI<GlobalState>) => actions$
	.ofType(ActionTypes.REQUEST_DETAILS, ActionTypes.SET_ACCESS_TOKEN)
	.switchMap(action => {
		switch (action.type) {
			case ActionTypes.REQUEST_DETAILS: {
				return getUser(store$.getState().user.accessToken!)
					.map(details => setDetails(details))
					.catch(err => [addError(err.message || err)]);
			}

			case ActionTypes.SET_ACCESS_TOKEN: {
				return [requestDetails()];
			}

			default: return [];
		}
	});

export * from "./actions";
export * from "./model";