// file: src/actions/index.js
import {GET_ORGANIZATIONS} from "./constants"
import axios from "axios/index"
import * as config from "../config/Api"

export function getOrganization( page = 1 ) {

	function briefData( organizations ) {
		let org = {
			best: organizations[0] || 0,
			worse: 0,
			best_iehg: 0,
			worse_iehg: 100,
		};
		let iegh_mean = 0;
		for (let i = 0; i < organizations.length; i++) {
			iegh_mean += organizations[i].iegh;
			if (organizations[i].iegh > org.best_iehg) {
				org.best_iehg = organizations[i].iegh;
				org.best = organizations[i];
			}
			if (organizations[i].iegh < org.worse_iehg) {
				org.worse_iehg = organizations[i].iegh;
				org.worse = organizations[i];
			}
		}
		iegh_mean = iegh_mean / organizations.length;
		return { iegh_mean, org }
	}

	return dispatch => {
		return axios.get(config.API_URL + config.ORGA_PATH + "?page=" + page)
		.then(result => {
			const brief = briefData(result.data.results);
			dispatch({
				type: GET_ORGANIZATIONS,
				result: { response: result, brief, page }
			})
		});
	}
}