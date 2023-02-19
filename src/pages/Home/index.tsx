import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, PokemonData, PokemonType } from "../../components/Card";
import { Footer } from "../../components/Footer";
import { HomeHeader } from "../../components/HomeHeader";
import searchIcon from "../../assets/img/searchIcon.png";

import api from "../../service/api";

import * as Styled from "./styles";

type Request = {
  id: number;
  types: PokemonType[];
};

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [foundPokemon, setFoundPokemon] = useState<PokemonData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { navigate } = useNavigation();

  function handleNavigation(pokemonId: number) {
    navigate("Detail", {
      pokemonId,
    });
  }

  async function getMorePokemonInfo(url: string): Promise<Request> {
    const response = await api.get(url);
    const { id, types } = response.data;

    return { id, types };
  }

  async function getAllPokemons() {
    const response = await api.get(`/pokemon?limit=999`);
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
  }

  function searchPokemon() {
    if (!searchTerm) {
      setPokemons(pokemons);
    }
    const found = [...pokemons].filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setPokemons(found);
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    searchPokemon();
  }, [searchTerm]);

  return (
    <Styled.Container>
      <FlatList
        ListHeaderComponent={
          <>
            <HomeHeader />
            <Styled.SearchContainer>
              <Styled.SearchImage source={searchIcon} />
              <Styled.SearchInput
                placeholder="What Pokémon are you looking for?"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
              ></Styled.SearchInput>
            </Styled.SearchContainer>
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
