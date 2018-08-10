import { GET_ORGANIZATIONS } from "../actions/constants"

const defaultState = {
	brief: {
		org: {
			best: null,
			worse: null,
			best_iehg: 0,
			worse_iehg: 0,
		},
		iegh_mean: null,
	},
	response: {
		count: 0,
		next: null,
		previous: null,
		results: []
	},
	page: 1
};
export default function organizationsReducer(state = defaultState, action) {
	switch (action.type) {
		case GET_ORGANIZATIONS:
			return {
				...state,
				brief: {
					...state.brief,
					...action.result.brief
				},
				response: {
					...state.response,
					...action.result.response.data
				},
				page: action.result.page
			};
		default:
			return state;
	}
}
