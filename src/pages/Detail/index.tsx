import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, Text } from "react-native";
import api from "../../service/api";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { circle } from "../../assets/img/circle.png";
import { dots } from "../../assets/img/dots.png";
import * as Styled from "./styles";

type RouteParams = {
  pokemonId: number;
};

type Stats = {
  base_stat: 62;
  stat: {
    name: string;
  };
};

type Abilities = {
  ability: {
    name: string;
  };
};

export type PokemonTypeName =
  | "grass"
  | "fire"
  | "water"
  | "poison"
  | "normal"
  | "bug"
  | "flying"
  | "electric"
  | "ground"
  | "dark"
  | "dragon"
  | "fairy"
  | "fighting"
  | "ghost"
  | "psychic"
  | "rock"
  | "steel"
  | "ice";

type PokemonType = {
  type: {
    name: PokemonTypeName;
  };
};

type PokemonProps = {
  id: number;
  name: string;
  color: string;
  stats: Stats[];
  abilities: Abilities[];
  types: PokemonType[];
};

export function Detail() {
  const route = useRoute();
  const { pokemonId } = route.params as RouteParams;
  const { colors } = useTheme();
  const [pokemonDetails, setPokemonDetail] = useState({} as PokemonProps);
  const [isLoading, setIsLoading] = useState(true);
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    async function getPokemonDetail() {
      try {
        const response = await api.get(`/pokemon/${pokemonId}`);
        const { stats, abilities, id, name, types } = response.data;

        const currentType = types[0].type.name as PokemonTypeName;
        const color = colors.backgroundCard[currentType];

        setPokemonDetail({
          stats,
          abilities,
          id,
          name,
          types,
          color,
        });
      } catch (error) {
        Alert.alert("Oops, there was an error!");
      } finally {
        setIsLoading(false);
      }
    }

    getPokemonDetail();
  }, []);

  return (
    <>
      {isLoading ? (
        <Text style={{ marginTop: 200 }}>Carregando...</Text>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <Styled.Header type={pokemonDetails.types[0].type.name}>
            <Styled.BackButton onPress={handleGoBack}>
              <Feather name="chevron-left" size={24} color="#fff" />
            </Styled.BackButton>

            <Styled.ContentImage>
              <Styled.CircleImage source={circle} />
              <Styled.PokemonImage
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`,
                }}
              />
            </Styled.ContentImage>
            <Styled.Content>
              <Styled.PokemonId>#{pokemonDetails.id}</Styled.PokemonId>
              <Styled.PokemonName>{pokemonDetails.name}</Styled.PokemonName>
              <Styled.PokemonTypeContainer>
                {pokemonDetails.types.map(({ type }) => (
                  <Styled.PokemonType key={type.name} type={type.name}>
                    <Styled.PokemonTypeText>{type.name}</Styled.PokemonTypeText>
                  </Styled.PokemonType>
                ))}
              </Styled.PokemonTypeContainer>
            </Styled.Content>
            <Styled.DotsImage source={dots} />
          </Styled.Header>

          <Styled.Container>
            <Styled.Title type={pokemonDetails.types[0].type.name}>
              Base Stats
            </Styled.Title>
            {pokemonDetails.stats.map((attribute) => (
              <Styled.StatsBar key={attribute.stat.name}>
                <Styled.Attributes>{attribute.stat.name}</Styled.Attributes>
                <Styled.AttributesValue>
                  {attribute.base_stat}
                </Styled.AttributesValue>
                <Styled.ContentBar>
                  <Styled.ProgressBar
                    type={pokemonDetails.types[0].type.name}
                    borderWidth={0}
                    progress={100}
                    width={attribute.base_stat}
                    color={pokemonDetails.color}
                  ></Styled.ProgressBar>
                </Styled.ContentBar>
              </Styled.StatsBar>
            ))}
            <Styled.Title type={pokemonDetails.types[0].type.name}>
              Abilities
            </Styled.Title>
            {pokemonDetails.abilities.map((ability) => (
              <Styled.Ability key={ability.ability.name}>
                {ability.ability.name}
              </Styled.Ability>
            ))}
          </Styled.Container>
        </ScrollView>
      )}
    </>
  );
}
