import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { Card, PokemonData, PokemonType } from "../../components/Card";
import api from "../../service/api";

import * as Styled from "./styles";

type Request = {
  id: number;
  types: PokemonType[];
};

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  useEffect(() => {
    async function getAllPokemons() {
      const response = await api.get("/pokemon");
      const { results } = response.data;

      const payload = await Promise.all(
        results.map(async (pokemon: PokemonData) => {
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
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.id.toString()}
        renderItem={({ item: pokemon }) => <Card data={pokemon} />}
      ></FlatList>
    </Styled.Container>
  );
}
