import React from "react"
import PropTypes from "prop-types"

const OrganizationBrief = (props) => {

	return (
		<dd className="col-md-6" onClick={() => props.onClick(props.pk, props.name)}
		    style={{cursor: 'pointer'}}>{props.name} avec {Number(props.iegh).toFixed(1)}</dd>
	)
}

OrganizationBrief.defaultProps = {
	pk: null,
	iegh: null,
	name: null,
}

OrganizationBrief.propTypes = {
	pk: PropTypes.number,
	iegh: PropTypes.number,
	name: PropTypes.string,
}

export default OrganizationBrief;