import React from 'react';
import cartoon from './images/cartoon.jpg';
import formula from './images/iegh-formula.png';

const WhatIslIEGH = () => {
	return (
		<div className="card">
			<div className="card-body">
				<h3 className="card-title">Qu'est ce que l'IEHG ?</h3>
				<a href="https://www.willmcphail.com/about/" target="_blank"
				   rel="noopener noreferrer"><img src={cartoon} className="App-cartoon"
				                                  alt="cartoon"
				                                  title="Décrivez ce que vous pouvez apporter à cette société."/></a>
				<p className="card-text text-justify">
					L'Indice d'Égalité Hiérarchique par Genre (IEHG) est une mesure de l'égalité
					des chances de promotion au sein d'une organisation. Il mesure l'écart entre
					la répartition globale des sexes et la composition des instances dirigeantes
					(comité exécutif, secrétariat général).
					Si l'IEHG vaut 100 alors les chances de promotions d'un homme ou d'une femme
					sont égales. Si il vaut 0 alors un genre
					maintient l'autre sous une domination totale.</p>
				<p className="card-text text-justify">
					La formule de calcul de l'IEGH est la suivante:
					<img src={formula} className="App-cartoon" alt="cartoon"
					     title="Formule de l'IEGH."/>
				</p>
			</div>
		</div>
	)
};

export default WhatIslIEGH;