import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Link } from 'react-router-dom';
import HorsConnexionListeBedes from './hors-connexion-liste-bede.component';

export default class HorsConnexionRechercherBede extends Component {

    constructor(props){
        super(props);

        this.onChangeRecherche = this.onChangeRecherche.bind(this); // Pour être sûr que la connexion se fasse avec with setState
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            recherche: "",
            redirection: false,
            erreur: false,
            data: [], 
            pas_de_resultat: false,
        }
    }

    onChangeRecherche(e) {
        this.setState({
            recherche: e.target.value
        });
    }

    onSubmit(e) {

        e.preventDefault();

        console.log("Demande envoyée");
        console.log("Recherche: ", this.state.recherche);

        const Recherche = {
            recherche: this.state.recherche,
        }

        if (this.state.recherche.length > 0) {
            console.log("dans le if de la recherche de bd avant ajout à la collection");
            api.post("bede/recherche", Recherche) // Permet de rechercher une bédé pour voir si elle est dans la base de donne et ainsi eviter que l'utilisateur rentre à chaque fois une nouvelle bédé et qu'il puisse compléter les informations si besoin
                .then(res => {
                    this.setState({
                        redirection: true,
                        data: res.data
                    })
                    console.log("res.data: ", this.state.data)});
    
                console.log('après la requête dans le back');

                // this.setState({
                //     redirection: true,
                //     // data: res.data
                // })
        } else if (this.state.recherche.length === 0) {
            this.setState({
                erreur: true,
            })
        }

    }

    render(){
        

        if (this.state.data.length === 0) { // Permet d'afficher la barre de recherche pour voir si la bédé que l'on souhaite ajouter
            return(                         // à notre collection n'est pas déjà dans la base de donnée
                <div style={{marginTop: 20}}>
                    <h5>Bonjour,</h5>
                    <h5>Vous pouvez d'abord rechercher votre bande-dessinée dans notre base de donnée et ainsi l'ajouter plus 
                        facilement à votre collection si elle existe déjà dans notre base de donnée.</h5>
                    <h5>Pour faciliter la recherche, veuillez respecter la nomenclature dont vous avez l'exemple dans la liste ci-dessous</h5>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Vous recherchez:</label>
                            <input type="text"
                                    className="form-control"
                                    placeholder="Par nom de la série, titre du tome, scénariste ou dessinateur"
                                    value={this.state.recherche}
                                    onChange={this.onChangeRecherche}
                                    />
                            {this.state.erreur === true &&
                            <p style={{color: "red"}}>Veuillez entrer une recherche</p>
                            }
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Rechercher" className="btn btn-primary" />
                        </div>
                    </form>
                    <div>
                    {/* <React.StrictMode> */}
                    <HorsConnexionListeBedes />
                    {/* </React.StrictMode> */}
                    </div>
                </div>
            )
        }

        if (this.state.data === 'vide') { // S'il n'y a pas de retour, affiche un lien pour ajouter manuellement la bédé
            return(                       // La barre de recherche est toujours là pour effectuer une autre recherche
                <div style={{marginTop: 20}}>
                    <h5>Bonjour,</h5>
                    <h5>Vous pouvez d'abord rechercher votre bande-dessinée dans notre base de donnée et ainsi l'ajouter plus 
                        facilement à votre collection si elle existe déjà dans notre base de donnée</h5>
                    <h5>Pour faciliter la recherche, veuillez respecter la nomenclature dont vous avez l'exemple dans la liste ci-dessous</h5>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Vous recherchez:</label>
                            <input type="text"
                                    className="form-control"
                                    placeholder="Par nom de la série, titre du tome, scénariste ou dessinateur"
                                    value={this.state.recherche}
                                    onChange={this.onChangeRecherche}
                                    />
                            {this.state.erreur === true &&
                            <p style={{color: "red"}}>Veuillez entrer une recherche</p>
                            }
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Rechercher" className="btn btn-primary" />
                        </div>
                    </form>
                <div>
                    <h5 style={{color: "red"}}>Pas de résultats à votre recherche.</h5>
                    <h5>Aucun résultat correspond à votre recherche, la bande-dessinée n'est peut-être pas dans 
                        notre base de donnée. En vous <Link to={"/inscription"}>inscrivant</Link>, vous pourrez enregistrer 
                        votre collection, discuter avec autres membres et enrichir la base de donnée de la communauté</h5>
                </div>
                <div>
                    {/* <React.StrictMode> */}
                    <HorsConnexionListeBedes />
                    {/* </React.StrictMode> */}
                    </div>
                </div>
            )
        }

        if (this.state.data.length !== 0) { // Affiche les résultats de la recherche pour ajouter plus rapidement un bédé à sa collection
            return(
                <div style={{marginTop: 20}}>
                    <h5>Bonjour,</h5>
                    <h5>Vous pouvez d'abord rechercher votre bande-dessinée dans notre base de donnée et ainsi l'ajouter plus 
                        facilement à votre collection si elle existe déjà dans notre base de donnée</h5>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Vous recherchez:</label>
                            <input type="text"
                                    className="form-control"
                                    placeholder="Par nom de la série, titre du tome, scénariste ou dessinateur"
                                    value={this.state.recherche}
                                    onChange={this.onChangeRecherche}
                                    />
                            {this.state.erreur === true &&
                            <p style={{color: "red"}}>Veuillez entrer une recherche</p>
                            }
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Rechercher" className="btn btn-primary" />
                        </div>
                    </form>
                <div>
                    <h5>Si les résultats ne correspondent pas à votre recherche, la bande-dessinée n'est peut-être pas dans 
                        notre base de donnée. En vous <Link to={"/inscription"}>inscrivant</Link>, vous pourrez enregistrer 
                        votre collection, discuter avec autres membres et enrichir la base de donnée de la communauté</h5> 
                </div>
                <div>
                    {this.state.data.map(bede => (
                        <div>
                            <div className="card">
                                <h3 className="card-header" key={bede.uid}>{bede.serie}</h3>
                                <h5 className="card-title" key={bede.uid}>Tome {bede.tome}: {bede.titre}</h5>
                                <h5 className="card-title" key={bede.uid}>Scénariste: {bede.scenariste}</h5>
                                <h5 className="card-title" key={bede.uid}>Dessinateur: {bede.dessinateur}</h5>
                                <h5 className="card-title" key={bede.uid}>Editeur: {bede.editeur}</h5>
                                <h5 className="card-title" key={bede.uid}>Année de sortie: {bede.annee_parution}</h5>
                                <p><Link to={"/bd/detail/" + bede._id}> Voir plus</Link></p>
                            </div>
                            <p></p>
                        </div>
                    ))}
                </div>
                <div>
                <h5>Si les résultats ne correspondent pas à votre recherche, la bande-dessinée n'est peut-être pas dans 
                        notre base de donnée. En vous <Link to={"/inscription"}>inscrivant</Link>, vous pourrez enregistrer 
                        votre collection, discuter avec autres membres et enrichir la base de donnée de la communauté</h5>
                </div>
                </div>
            )
        }

    }
}