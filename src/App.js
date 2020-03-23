import React, { Component } from 'react'
import Pokemon from './components/Pokemon';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      catchedPokemons: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPokemon = this.fetchPokemon.bind(this);
  }

  handleChange(evt) {
    let pokemon =  evt.target.value.toLowerCase();
    this.setState({search: pokemon});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.fetchPokemon();
  }

  // Method to fetch a pokemon from the official api and update the state with a new list of catched pokemons
  fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`)
        .then(res => res.json())
        .then((data) => {
          const pokemon = {id: data.id, name: data.name, img: data.sprites.front_default}
          this.setState(state => {
            const catchedPokemons = state.catchedPokemons.concat(pokemon);
            return {
              catchedPokemons,
              search: ''
            };
          });
        });
  }

  render() {
    return(
      <div className="App">
        <form className="form-inline mt-5 ml-5" onSubmit={this.handleSubmit}>
          <div className="form-group mx-sm-3 mb-2">
            <input type="text" autoComplete="off" value={this.state.search} onChange={this.handleChange} className="form-control" id="pokemon-search" placeholder="Enter pokemon name"/>
          </div>
          <button type="submit" className="btn btn-primary mb-2">Catch!</button>
        </form>

        <div className="ml-5">
          <h2>List of pokemons captured</h2>
          {this.state.catchedPokemons.map(pokemon => {
            return <Pokemon img={pokemon.img} name={pokemon.name} id={pokemon.id} />
          })}
        </div>
      </div>
    )
  }
}

export default App;