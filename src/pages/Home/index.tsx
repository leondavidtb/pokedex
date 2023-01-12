import React, { useEffect, useState } from "react";
import api from "../../service/api";

import * as Styled from "./styles";

type PokemonType = {
  type: string;
};

type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
};

export function Home() {
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    async function getAllPokemons() {
      const response = await api.get("/pokemon");
      const { results } = response.data;

      const payload = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMorePokemonInfo(pokemon.url);

          return {
            name: pokemon.name,
            id,
            types,
          };
        })
      );

      console.log(payload);
    }

    getAllPokemons();
  }, []);

  async function getMorePokemonInfo(url: string) {
    const response = await api.get(url);
    const { id, types } = response.data;

    return { id, types };
  }

  return <Styled.Container></Styled.Container>;
}
