import React from 'react';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import {getOrganization} from "../../actions"

window.getOrganization = getOrganization;


class OrganizationsPages extends React.Component {

	loadPage = (e, n) => {
		e.preventDefault();
		this.props.loadPage(n);
	}
	render() {
		let pagesCount = Math.ceil(this.props.count / this.props.perPage);
		let pages = [];

		let limit = ( this.props.next !== null ) ? pagesCount : this.props.page;

		for (let i = 0; i < limit; i++) {
			pages.push(i + 1)
		}

		return (
			<ul className="pagination">{pages.map((i) => {
				const activeClass = (this.props.page===i) ? 'active' : null;
				return <li key={i}><a className={activeClass} onClick={(e) => this.loadPage(e, i)} href="return false;">{i}</a></li>
			})}</ul>
		);
	}
}

OrganizationsPages.defaultProps = {
	count: null,
	next: null,
	previous: null,
	perPage: null,
}

OrganizationsPages.propTypes = {
	count: PropTypes.number,
	next: PropTypes.string,
	previous: PropTypes.string,
	perPage: PropTypes.number,
}

const OrganizationsPagesConnected = connect(
	(state) => state,
	(dispatch) => {
		return {
			loadPage: (n) => {
				dispatch(getOrganization(n))
			}
		}
	}
)(OrganizationsPages)

export default OrganizationsPagesConnected;