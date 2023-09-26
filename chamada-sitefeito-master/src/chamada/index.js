import './index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Chamada() {
  const [nome, setNome] = useState('');
  const [listaChamada, setListaChamada] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  useEffect(() => {
    listar();
  }, []);

  async function Salvar() {
    try {
      const inscricao = {
        nome: nome
      };

      setNome('');

      const url = 'http://localhost:5000/inserir';
      await axios.post(url, inscricao);

      listar();
    } catch (err) {
      console.error(err);
    }
  }

  async function listar() {
    try {
      const url = 'http://localhost:5000/consulta';
      const resposta = await axios.get(url);
      setListaChamada(resposta.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function buscarPokemon() {
    try {
      const response = await axios.get(url);

      const listaPokemon = [];

      for (let item of response.data.results) {
        const pokemonResp = await axios.get(item.url);

        const imagem = pokemonResp.data.sprites.other['official-artwork'].front_default;

        let tipos = '';
        for (let t of pokemonResp.data.types) {
          tipos = tipos + t.type.name + '/';
        }

        listaPokemon.push({
          nome: item.name,
          imagem: imagem,
          tipo: tipos
        });
      }

      setPokemons(listaPokemon);
    } catch (err) {
      console.error(err);
    }
  }

  async function apagar(id) {
    try {
      const url = `http://localhost:5000/deletar/${id}`;
      await axios.delete(url);
      listar();
    } catch (err) {
      console.error(err);
    }
  }

  async function alterar(id) {
    try {
      const url = `http://localhost:5000/alterar/${id}`;
      await axios.put(url, { nome: nome });
      setNome('');
      listar();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="chamada">
      <nav>
        <h1>Pokémons</h1>
        <h4>Monte sua escalamon</h4>
        <input value={nome} onChange={(e) => setNome(e.target.value)}></input>
        <div>
          <button onClick={Salvar}>Salvar</button>
          <button onClick={listar}>Mostrar Lista</button>
          <button onClick={buscarPokemon}>Pokemons</button>
        </div>
        <div className='div'>
          <table>
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              {listaChamada.map((item) => (
                <tr key={item.id_chamada}>
                  <td>{item.id_chamada}</td>
                  <td>{item.nm_nome}</td>
                  <td>
                    <img src={item.imagem}></img>
                  </td>
                  <td>{item.tipo}</td>
                  <td>
                    <button onClick={() => apagar(item.id_chamada)}>APAGAR</button>
                    <button onClick={() => alterar(item.id_chamada)}>ALTERAR</button>
                  </td>
                </tr>
              ))}

              {pokemons.map((pokemon, index) => (
                <tr key={index}>
                  <td>{pokemon.nome}</td>
                  <td>
                    <img src={pokemon.imagem} alt={pokemon.nome}></img>
                    
                  </td>

                  <td>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </nav>
    </div>
  );
}
