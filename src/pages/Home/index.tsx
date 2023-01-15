import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, PokemonData, PokemonType } from "../../components/Card";
import { Footer } from "../../components/Footer";

import api from "../../service/api";
import pokeballHeader from "../../assets/img/pokeball.png";

import * as Styled from "./styles";

type Request = {
  id: number;
  types: PokemonType[];
};

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [offset, setOffset] = useState(0);
  const { navigate } = useNavigation();

  function handleNavigation(pokemonId: number) {
    navigate("Detail", {
      pokemonId,
    });
  }

  async function getAllPokemons() {
    const response = await api.get(`/pokemon?limit=10&offset=${offset}`);
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

    setPokemons((pokemon) => [...pokemon, ...payload]);
    setOffset(offset + 10);
  }

  useEffect(() => {
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
        ListHeaderComponent={
          <>
            <Styled.Header source={pokeballHeader} />
            <Styled.Title>Pokédex</Styled.Title>
            <Styled.Subtitle>
              Search for Pokémon by name or using the National Pokédex number.
            </Styled.Subtitle>
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.id.toString()}
        renderItem={({ item: pokemon }) => (
          <Card
            data={pokemon}
            onPress={() => {
              handleNavigation(pokemon.id);
            }}
          />
        )}
        onEndReachedThreshold={0.1}
        onEndReached={getAllPokemons}
        ListFooterComponent={<Footer />}
      ></FlatList>
    </Styled.Container>
  );
}
