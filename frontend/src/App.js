import React  from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';
import {bindActionCreators} from "redux"
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Description from './components/Description';
import WhatIslIEGH from './components/WhatIslIEGH/WhatIslIEGH';
import OrganizationsPages from './components/OrganizationsPages/OrganizationsPages';
import Organization from './components/Organization';
import OrganizationData from './components/OrganizationData';
import HorizontalChart from './components/HorizontalChart';
import DataInBrief from './components/DataInBrief';

class IEHGIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected_org: null
		};
	}

	componentDidMount() {
		this.props.actions.getOrganization(1);
	}

	handleClickOrg = (pk, name) => {
		this.setState({
			...this.state,
			selected_org: {
				pk,
				name
			},
		});
	}


	render() {
		const {results, count, next, previous} = this.props.organizations.response;
		const {brief, page} = this.props.organizations;
		const selected_org = (this.state.selected_org === null) ? brief.org.worse : this.state.selected_org;

		return (
			<div className="App">
				<Header/>
				<div className="container-fluid">
					<Description/>
					<div className="row">
						<div className="col-sm-4">
							<WhatIslIEGH/>
							<div className="card">
								<div className="card-body">
									<h3 className="card-title">Contribuer</h3>
									<ul>
										<li>Ajouter une organisation</li>
										<li>Proposer une mise à jour</li>
										<li>Faire évoluer le site</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-sm-8">
							<div className="row">
								<div className="col-sm-4">
									<h2>En bref</h2>
									<div id="in-brief">
										<DataInBrief
											orgWorse={brief.org.worse}
											orgBest={brief.org.best}
											orgCount={count}
											ieghMean={brief.iegh_mean}
											onClick={this.handleClickOrg}
										/>
									</div>

									<h3>Indices d'égalité<br/>(100 à égalité)</h3>
									<div className="organizations-list">
										{results.map(org => {
											return (
												<Organization key={org.pk} data={org} onclick={this.handleClickOrg}/>
											)
										})}
										<OrganizationsPages page={page} count={count} next={next} previous={previous} perPage={results.length}/>
									</div>
								</div>
								<div className="col-sm-8 organization-detail">
									{selected_org && <OrganizationData name={selected_org.name} pk={selected_org.pk}/>}
								</div>
								<div className="clearfix"/>
								<div style={{"width":"100%"}}>
									<HorizontalChart data={results} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

/*
class OrganizationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.orga_name = Array.from(this.props.organizations, x => x.name);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var color = 'black';
		if (this.orga_name.indexOf(event.target.value) > -1) {
			color = 'red'
		}
		this.setState({value: event.target.value, color: color});
	}

	displayHome = () => {
		ReactDOM.render(<IEHGIndex/>, document.getElementById('root'));
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		this.displayHome();
		//event.preventDefault();
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">L'égalité c'est maintenant</h1>
				</header>
				<h2 className="text-center">Ajouter une organisation</h2>
				<div className="container">
					<div className="row">
						<div className="col-md-6 offset-md-3">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label>Nom</label>
									<input className="form-control" type="text" style={{color: this.state.color}}
									       value={this.state.value} onChange={this.handleChange} id="orga-name"/>
								</div>
								<input type="submit" value="Envoyer"/> <input type="button" value="Annuler"
								                                              onClick={this.displayHome}/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
*/

export default connect(
	(state) => { return state },
	(dispatch) => { return {actions: bindActionCreators(actions, dispatch)} }
)(IEHGIndex);