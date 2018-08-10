import React from "react"
import C3Chart from 'react-c3js';

const DataDonuts = (props) => {
	return(
		<div style={{width:"200px","margin":"0 auto"}}>
		<C3Chart data={{ json:props.data, 'type': 'donut' }} donut={{'title':props.title }} />
		</div>	)
}
export default DataDonuts;