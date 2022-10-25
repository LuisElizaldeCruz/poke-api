import axios from 'axios';
import { React, useEffect, useState } from 'react'

export default function Pokedata() {
    const [pokemon, setPokemon] = useState("pikachu");
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonType, setPokemonType] = useState("");

    const getPokemon = async () => {
        const toArray = [];
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
            const res = await axios.get(url);
            toArray.push(res.data);
            setPokemonType(res.data.types[0].type.name);
            setPokemonData(toArray);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }
    /*
        useEffect(() => {
            getPokemon();
        }, []);
        */

    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getPokemon();
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Introduce algun pokemon"
                    />
                </label>
            </form>
            {
                pokemonData.map((data) => {
                    return (
                        <div className='container'>
                            <img src={data.sprites["front_default"]} alt="pokemon"/>
                            <div className="divTable">
                                <div className="divTableBody"></div>
                                <div className="divTableRow">
                                    <div className="divTableCe">Tipo</div>
                                    <div className="divTableCe">{pokemonType}</div>
                                </div>
                                <div className="divTableRow">
                                    <div className="divTableCe">Altura</div>
                                    <div className="divTableCe">{" "}{Math.round(data.height * 3.9)} "</div>
                                </div>
                                <div className="divTableRow">
                                    <div className="divTableCe">Peso</div>
                                    <div className="divTableCe">{" "}{Math.round(data.weight/4.3)} lbs</div>
                                </div>
                                <div className="divTableRow">
                                    <div className="divTableCe">Numero de batallas</div>
                                    <div className="divTableCe">{data.game_indices.length}</div>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </>
    );
};
