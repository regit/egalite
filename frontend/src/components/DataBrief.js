import React from "react"
import OrganizationBrief from './OrganizationBrief';

export default class DataInBrief extends React.Component {

	render() {
		return(
			<dl className="row">
				<dt className="col-md-6">Organisations référencées</dt>
				<dd className="col-md-6">{this.props.orgas_count}</dd>
				<dt className="col-md-6">IEHG moyen</dt>
				<dd className="col-md-6">{Number(this.props.iegh_mean).toFixed(1)}</dd>
				<dt className="col-md-6">Pire organisation</dt>
				<OrganizationBrief orga={this.props.orga_worse}/>
				<dt className="col-md-6">Meilleure organisation</dt>
				<OrganizationBrief orga={this.props.orga_best}/>
			</dl>
		)
	}
}