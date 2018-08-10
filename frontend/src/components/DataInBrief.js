import React from "react"
import PropTypes from "prop-types";
import OrganizationBrief from "./OrganizationBrief";

const DataInBrief = (props) => {
	return (
		<dl className="row">
			<dt className="col-md-6">Organisations référencées</dt>
			<dd className="col-md-6">{props.orgCount}</dd>
			<dt className="col-md-6">IEHG moyen</dt>
			<dd className="col-md-6">{Number(props.ieghMean).toFixed(1)}</dd>
			<dt className="col-md-6">Pire organisation</dt>
			{props.orgWorse && <OrganizationBrief onClick={props.onClick} name={props.orgWorse.name} pk={props.orgWorse.pk} iegh={props.orgWorse.iegh}/>}
			<dt className="col-md-6">Meilleure organisation</dt>
			{props.orgBest && <OrganizationBrief onClick={props.onClick} name={props.orgBest.name} pk={props.orgBest.pk} iegh={props.orgBest.iegh}/>}
		</dl>
	)

}

DataInBrief.defaultProps = {
	orgWorse: null,
	orgBest: null,
	orgCount: null,
	ieghMean: null,
}
DataInBrief.propTypes = {
	orgWorse: PropTypes.object,
	orgBest: PropTypes.object,
	orgCount: PropTypes.number,
	ieghMean: PropTypes.number,
}

export default DataInBrief;