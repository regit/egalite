import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import C3Chart from 'react-c3js';
import logo from './logo.svg';
import cartoon from './images/cartoon.jpg';
import './App.css';
import * as config from './config/Api.js';

function displayOrgaDataDetail(orga, id) {
   axios.get(config.API_URL + config.ORGDATA_PATH + id + '/')
   .then(res => {
     const orgdata = <OrganizationData data={res.data} orga={orga} />;
     ReactDOM.render(orgdata, document.getElementById('orga-detail'));
   });
}

function displayHome() {
  ReactDOM.render(<IEHGIndex />, document.getElementById('root'));
}

class IEHGIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      current_orga: undefined
    };

    this.addOrga = this.addOrga.bind(this);
    this.clickOrga = this.clickOrga.bind(this);

  }

  componentDidMount() {
        axios.get(config.API_URL + config.ORGA_PATH)
      .then(res => {
         var orgas = res.data;
         var orga_best = res.data[0];
         var orga_worse = undefined;
         var orga_best_iehg = 0;
         var orga_worse_iehg = 100;
         var iegh_mean = 0;
         var i;
         for (i = 0; i < orgas.length; i++) {
           iegh_mean += orgas[i].iegh;
           if (orgas[i].iegh > orga_best_iehg) {
             orga_best_iehg = orgas[i].iegh;
             orga_best = orgas[i];
           }
           if (orgas[i].iegh < orga_worse_iehg) {
             orga_worse_iehg = orgas[i].iegh;
             orga_worse = orgas[i];
           }
         }
         iegh_mean = iegh_mean / orgas.length;
         orga_worse_iehg = Number(orga_worse_iehg).toFixed(1);
         orga_best_iehg = Number(orga_best_iehg).toFixed(1);
         this.setState({ organizations: res.data, current_orga: orga_worse });
         const gdata = <DataInBrief orga_worse={orga_worse} orga_best={orga_best} orgas_count={orgas.length} iegh_mean={iegh_mean} />;
         ReactDOM.render(gdata, document.getElementById('in-brief'));
      });
  }

  clickOrga(orga) {
	this.setState({current_orga: orga});
  }

  addOrga() {
     ReactDOM.render(<OrganizationForm organizations={this.state.organizations}/>, document.getElementById('root'));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
	  <h1 className="App-title">Indice d'Égalité Hiérarchique par Genre</h1>
          <h2 className="App-title">Quelle est la résistance du plafond de verre?</h2>
        </header>

        <div className="container-fluid">
          <div className="row">
	     <div className="col-sm-12">
	        <p className="text-justify">Les obligations des entreprises en termes d'égalité professionnelle sont désormais inscrites dans la loi et concernent notamment celles qui comptent 50 salariés et plus. Malgré ces nombreuses mesures, la résistance du plafond de verre perdure. En effet, si la « Loi Copé-Zimmermann » fixe un quota obligatoire de 40% du sexe sous-représenté dans les Conseils d'Administration au 1er janvier 2017 dans les entreprises cotées et dans les sociétés comptant plus de 500 salariés, la promotion interne des entreprises n'est pas véritablement encadrée. Or une vraie mixité dans les instances dirigeantes est un enjeu de compétitivité et de performance économique et sociale. Il est en outre important que les femmes et les hommes prennent pleinement conscience des progrès qui restent à accomplir.</p>
	     </div>
	  </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                <h3 className="card-title">Qu'est ce que l'IEHG ?</h3>
          		<a href="https://www.willmcphail.com/about/" target="_blank"><img src={cartoon} className="App-cartoon" alt="cartoon" title="Décrivez ce que vous pouvez apporter à cette société." /></a>
                 <p className="card-text text-justify">
                   L'Indice d'Égalité Hiérarchique par Genre (IEHG) est une mesure de l'égalité
                   des chances de promotion au sein d'une organisation. Il mesure l'écart entre
                   la répartition globale des sexes et la composition des instances dirigeantes (comité exécutif, secrétariat général).
                   Si l'IEHG vaut 100 alors les chances de promotions d'un homme ou d'une femme sont égales. Si il vaut 0 alors un genre
                   maintient l'autre sous une domination totale.
                </p>
               </div>
             </div>  
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Contribuer</h3>
                    <ul>
                      <li onClick={this.addOrga} style={{cursor:'pointer'}} >Ajouter une organisation</li>
                      <li>Proposer une mise à jour</li>
                      <li>Faire évoluer le site</li>
                    </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <h2>En bref</h2>
                <div id="in-brief"></div>

              <h3>Indices d'égalité (100 à égalité)</h3>
              <div className="organizations-list">
                {this.state.organizations.map(orga => {
                  return(
                   <Organization key={orga.pk} data={orga} onclick={this.clickOrga}/>
                  )
                })}
              </div>
            </div>
            <div className="col-sm-5 organization-detail" id="orga-detail">
	        {this.state.current_orga &&
	    	<OrganizationData orga={this.state.current_orga} />
		}
            </div>
          </div>
        </div>
      <div className="App-footer">Copyright 2018, Olya Ranguelova et Éric Leblond</div>
      </div>
    );
  }
}



class Organization extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    return this.props.onclick(this.props.data);
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

class OrganizationData extends Component {
   constructor(props) {
	   super(props);
	   this.state = {data: undefined};
   }
   componentDidMount() {
	axios.get(config.API_URL + config.ORGDATA_PATH + this.props.orga.pk + '/')
   		.then(res => {
     			this.setState({ data: res.data});
   	});
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
	axios.get(config.API_URL + config.ORGDATA_PATH + this.props.orga.pk + '/')
   		.then(res => {
     			this.setState({ data: res.data});
   	});
   }

  render() {
	  if (this.state.data) {
    var women_global_ratio = Number(100 - this.state.data.global_male_ratio).toFixed(1);
    var men_global_ratio = Number(this.state.data.global_male_ratio).toFixed(1);
    var women_director_ratio = Number(100 * this.state.data.direction_female / (this.state.data.direction_female + this.state.data.direction_male)).toFixed(1);
    var iehg = Number(this.state.data.iehg).toFixed(1);
    var direction_data = {'Homme': this.state.data.direction_male, 'Femme': this.state.data.direction_female};
    var global_data = {'Homme': men_global_ratio, 'Femme': women_global_ratio };
	  }
    return(
      <div className="card">
        <div className="card-body">
           <h4 className="card-title">{this.props.orga.name} (IEHG : {iehg})</h4>
	   {this.state.data &&
	   <React.Fragment>
	   <dl className="row">
             <dt className="col-md-6">Part de femmes dans l'effectif global</dt><dd className="col-md-6">{women_global_ratio} %</dd>
             <dt className="col-md-6">Part de femmes directeurs</dt><dd className="col-md-6">{women_director_ratio} %</dd>
             <dt className="col-md-6">Composition de la direction</dt><dd className="col-md-6">{this.state.data.direction_female} femme(s) et {this.state.data.direction_male} hommes</dd>
           </dl>
           <div className="row">
             <div className="col-md" id="global">
               <DataDonuts data={global_data} title='Global' />
             </div>
             <div className="col-md" id="direction">
               <DataDonuts data={direction_data} title='Direction' />
             </div>
           </div>
           <p style={{'fontSize': '80%'}} className="text-center">Données: année {this.state.data.year}.</p>
	   </React.Fragment>
	   }
        </div>
      </div>
    )
  }
}

class DataDonuts extends Component {
  render() {
    return(
      <C3Chart data={{ json:this.props.data, 'type': 'donut' }} donut={{'title':this.props.title }} />
    )
  }
}

class DataInBrief extends Component {
 
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

class OrganizationBrief extends Component {
  constructor(props) {
    super(props)
    this.showDetail = this.showDetail.bind(this);
  }

  showDetail() {
    return displayOrgaDataDetail(this.props.orga, this.props.orga.latest_data_id);
  }
 
  render() {
    return(
      <dd className="col-md-6" onClick={this.showDetail} style={{cursor:'pointer'}}>{this.props.orga.name} avec {Number(this.props.orga.iegh).toFixed(1)}</dd>
    )
  }
}

class OrganizationForm extends Component {
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

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    displayHome();
    //event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">L'égalité c'est maintenant</h1>
        </header>
        <h2 className="text-center">Ajouter une organisation</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Nom</label>
                    <input className="form-control" type="text" style={{color: this.state.color}} value={this.state.value} onChange={this.handleChange} id="orga-name"/>
                </div>
               <input type="submit" value="Envoyer" /> <input type="button" value="Annuler" onClick={displayHome} />
              </form>
            </div>
          </div>
        </div>
      </div>
      )
    }
}

export default IEHGIndex;
