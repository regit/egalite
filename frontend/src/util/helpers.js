export function calculateStats( data ) {
	// Check for for data corectness
	if( typeof data.global_male_ratio === 'undefined' ) console.warn('Warning global_male_ratio is missing!');
	if( typeof data.direction_female === 'undefined' ) console.warn('Warning direction_female is missing!');
	if( typeof data.direction_male === 'undefined' ) console.warn('Warning direction_male is missing!');
	if( typeof data.iehg === 'undefined' ) console.warn('Warning iehg is missing!');

	// Calculate
	let { global_male_ratio, direction_female, direction_male, iehg } = data;
	let women_global_ratio = ( global_male_ratio ) ? Number(100 - global_male_ratio).toFixed(1) : 0;
	let men_global_ratio = Number(global_male_ratio).toFixed(1);
	let women_director_ratio = ( direction_female ) ? Number(100 * direction_female / (direction_female + direction_male)).toFixed(1) : 0;
	let iehg_var = ( iehg ) ? Number(iehg).toFixed(1) : null;
	let direction_data = {
		'Homme': direction_male,
		'Femme': direction_female
	};
	let global_data = {
		'Homme': men_global_ratio,
		'Femme': women_global_ratio
	};

	// Export
	return {
		women_global_ratio,
		men_global_ratio,
		women_director_ratio,
		iehg_var,
		direction_data,
		global_data,
	}
}