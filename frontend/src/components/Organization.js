import React from 'react';
export default class Organization extends React.Component {

	handleClick = () => {
		return this.props.onclick(this.props.data.pk, this.props.data.name);
	}

	render() {
		var orga_iegh = Number(this.props.data.iegh).toFixed(1);
		return (
			<div className="organization" onClick={this.handleClick} style={{cursor:'pointer'}}>
				<h5>{this.props.data.name}</h5>
				<div className="progress bg-warning progress-bar-striped">
					<div className="progress-bar" role="progressbar" style={{ width: orga_iegh + '%' }} aria-valuenow={ orga_iegh} aria-valuemin="0" aria-valuemax="100">{ orga_iegh }</div>
				</div>
			</div>
		)
	}
}