import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import api from "../../service/api";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import dots from "../../assets/img/dots.png";
import heightIcon from "../../assets/img/heightIcon.png";
import weightIcon from "../../assets/img/weightIcon.png";
import * as Styled from "./styles";

type RouteParams = {
  pokemonId: number;
};

type Stats = {
  base_stat: number;
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
  height: number;
  weight: number;
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
        const { stats, abilities, id, name, types, height, weight } =
          response.data;

        const currentType = types[0].type.name as PokemonTypeName;
        const color = colors.backgroundCard[currentType];

        setPokemonDetail({
          stats,
          abilities,
          id,
          name,
          types,
          color,
          height,
          weight,
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
        <View style={{ marginTop: 300 }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <Styled.Header type={pokemonDetails.types[0].type.name}>
            <Styled.BackButton onPress={handleGoBack}>
              <Feather name="chevron-left" size={24} color="#fff" />
            </Styled.BackButton>
            <Styled.PokemonId>#{pokemonDetails.id}</Styled.PokemonId>
            <Styled.PokemonName>{pokemonDetails.name}</Styled.PokemonName>
            <Styled.PokemonStyledName>
              {pokemonDetails.name.toUpperCase()}
            </Styled.PokemonStyledName>

            <Styled.DotsImage source={dots} />
          </Styled.Header>

          <Styled.Container>
            <Styled.ContentImage>
              <Styled.PokemonImage
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`,
                }}
              />
            </Styled.ContentImage>
            <Styled.Content>
              <Styled.PokemonTypeContainer>
                {pokemonDetails.types.map(({ type }) => (
                  <Styled.PokemonType key={type.name} type={type.name}>
                    <Styled.PokemonTypeText>{type.name}</Styled.PokemonTypeText>
                  </Styled.PokemonType>
                ))}
              </Styled.PokemonTypeContainer>
            </Styled.Content>
            <Styled.Title type={pokemonDetails.types[0].type.name}>
              About
            </Styled.Title>
            <Styled.AboutSection>
              <Styled.HeightSection>
                <Styled.AboutIcon source={heightIcon} />
                <Styled.PokemonHeightValue>
                  {pokemonDetails.height} m
                </Styled.PokemonHeightValue>
              </Styled.HeightSection>

              <Styled.PokemonSeparator />
              <Styled.WeightSection>
                <Styled.AboutIcon source={weightIcon} />
                <Styled.PokemonWeightValue>
                  {pokemonDetails.weight} kg
                </Styled.PokemonWeightValue>
              </Styled.WeightSection>

              <Styled.PokemonSeparator />
              <Styled.AbilityBox>
                {pokemonDetails.abilities.map((ability) => (
                  <Styled.Ability key={ability.ability.name}>
                    {ability.ability.name}
                  </Styled.Ability>
                ))}
              </Styled.AbilityBox>
            </Styled.AboutSection>
            <Styled.Title type={pokemonDetails.types[0].type.name}>
              Base Stats
            </Styled.Title>
            {pokemonDetails.stats.map((attribute) => (
              <Styled.StatsBar key={attribute.stat.name}>
                <Styled.Attributes>{attribute.stat.name}</Styled.Attributes>
                <Styled.AttributesValue>
                  {attribute.base_stat}
                </Styled.AttributesValue>
                <Styled.ContentBar type={pokemonDetails.types[0].type.name}>
                  <Styled.ProgressBar
                    type={pokemonDetails.types[0].type.name}
                    borderWidth={0}
                    progress={100}
                    width={attribute.base_stat}
                    color={pokemonDetails.color}
                  />
                </Styled.ContentBar>
              </Styled.StatsBar>
            ))}
          </Styled.Container>
        </ScrollView>
      )}
    </>
  );
}
