import React from 'react';
import c3 from 'c3';
import axios from "axios/index"
import * as config from "../config/Api"
import PropTypes from "prop-types"
import {calculateStats} from '../util/helpers'

class HorizontalChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			legend: [],
			homme: ['Homme'],
			femme: ['Femme'],
			iehg: ['IEHG'],
			direction: ['Direction Femme']
		};
		this.t = null;
		this.vizualizedIds = {};
		this.resetLocalData();
	}
	resetLocalData = () => {
		this.legend = [];
		this.homme = [];
		this.femme = [];
		this.iehg = [];
		this.direction = [];
	}
	getDetails = (i, pk) => {
		axios.get(config.API_URL + config.ORGDATA_PATH + pk + '/')
		.then(res => {

			clearTimeout(this.t);
			this.vizualizedIds[ pk ] = true;

			const {
				women_global_ratio,
				men_global_ratio,
				women_director_ratio,
				iehg_var,
			} = calculateStats(res.data);

			this.homme[i] = men_global_ratio;
			this.femme[i] = women_global_ratio;
			this.iehg[i] = iehg_var;
			this.direction[i] = women_director_ratio;
			this.t = setTimeout(() => {
				this.setState({
					...this.state,
					homme: [ ...this.state.homme, ...this.homme],
					femme: [ ...this.state.femme, ...this.femme],
					iehg: [ ...this.state.iehg, ...this.iehg],
					direction: [ ...this.state.direction, ...this.direction],
				});

			},100);
		});
	}

	componentWillReceiveProps(nextProps){

		if( typeof nextProps.data !== 'undefined' ){
			this.resetLocalData();
			let { data } = nextProps;
			for (let i = 0, len = data.length; i < len; ++i) {
				if( this.vizualizedIds[ data[i].pk ] ) continue;
				this.legend[i] = data[i].name;
				this.getDetails(i, data[i].pk);
			}
			this.setState({
				...this.state,
				legend: [ ...this.state.legend, ...this.legend ]
			})
		}
	}
	componentDidUpdate(){
		this.renderChart();
	}
	componentDidMount(){
		this.renderChart()
	}
	renderChart = () => {
		c3.generate({
			bindto: "#HorizontalChart",
			data: {
				columns: [
					[...this.state.homme],
					[...this.state.femme],
					[...this.state.iehg],
					[...this.state.direction],
				],
				type: 'bar',
				types: {
					'Direction Femme': 'area',
				},
				groups: [
					['Homme', 'Femme']
				]
			},
			axis: {
				x: {
					type: 'category',
					categories: this.state.legend
				}
			},
		});
	}
	render() {
		return (
			<div style={{"width": "100%"}}>
				<div id="HorizontalChart" />
			</div>
		);
	}
}

HorizontalChart.defaultProps = {
	data: [],
}
HorizontalChart.propTypes = {
	data: PropTypes.array,
}


export default HorizontalChart;