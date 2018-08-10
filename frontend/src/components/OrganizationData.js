import axios from "axios/index"
import React from "react"
import * as config from "../config/Api"
import DataDonuts from "./DataDonuts";
import PropTypes from "prop-types"
import { calculateStats } from '../util/helpers';

class OrganizationData extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				direction_male: null,
				direction_female: null,
				global_male_ratio: null,
				iehg: null,
			}
		};
	}

	componentDidMount() {
		const { pk } = this.props;
		axios.get(config.API_URL + config.ORGDATA_PATH + pk + '/')
		.then(res => {
			this.setState({ data: res.data});
		});
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		const { pk } = this.props;
		if (pk !== prevProps.pk) {
			axios.get(config.API_URL + config.ORGDATA_PATH + pk + '/')
			.then(res => {
				this.setState({ data: res.data});
			});
		}
	}

	render() {
		const { name } = this.props;
		const {
			women_global_ratio,
			women_director_ratio,
			iehg_var,
			direction_data,
			global_data
		} = calculateStats(this.state.data);


		return(
			<div className="card">
				<div className="card-body">
					<h4 className="card-title">{name} (IEHG : {iehg_var})</h4>
					{this.state.data &&
					<React.Fragment>
						<dl className="row">
							<dt className="col-md-6">Part de femmes dans l'effectif global</dt><dd className="col-md-6">{women_global_ratio} %</dd>
							<dt className="col-md-6">Part de femmes directeurs</dt><dd className="col-md-6">{women_director_ratio} %</dd>
							<dt className="col-md-6">Composition de la direction</dt><dd className="col-md-6">{this.state.data.direction_female} femme(s) et {this.state.data.direction_male} hommes</dd>
						</dl>
						<div className="row">
							<div className="col-md" id="global">
								<DataDonuts data={global_data} title='Global' />
							</div>
							<div className="col-md" id="direction">
								<DataDonuts data={direction_data} title='Direction' />
							</div>
						</div>
						<p style={{'fontSize': '80%'}} className="text-center">Données: année {this.state.data.year}.</p>
					</React.Fragment>
					}
				</div>
			</div>
		)
	}
}

OrganizationData.defaultProps = {
	name: null,
	pk: null,
}
OrganizationData.propTypes = {
	name: PropTypes.string,
	pk: PropTypes.number,
}

export default OrganizationData;