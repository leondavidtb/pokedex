import React, { useEffect, useState } from "react";
import { Text } from "react-native";
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

type Request = {
  id: number;
  types: PokemonType[];
};

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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

      setPokemons(payload);
    }

    getAllPokemons();
  }, []);

  async function getMorePokemonInfo(url: string): Promise<Request> {
    const response = await api.get(url);
    const { id, types } = response.data;

    return { id, types };
  }

  return (
    <Styled.Container>
      {pokemons.map((pokemon) => (
        <Text key={pokemon.id}>{pokemon.name}</Text>
      ))}
    </Styled.Container>
  );
}
