import React from "react";
import { TouchableOpacityProps } from "react-native";
import dotsImage from "../../assets/img/dots.png";
import pokeballCard from "../../assets/img/pokeballCard.png";
import { PokemonTypeName } from "../../pages/Detail";
import * as Styled from "./styles";

export type PokemonType = {
  type: {
    name: PokemonTypeName;
  };
};

export type PokemonData = {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
};

export type Props = {
  data: PokemonData;
} & TouchableOpacityProps;

export function Card({ data, ...rest }: Props) {
  return (
    <Styled.PokemonCard type={data.types[0].type.name} {...rest}>
      <Styled.LeftSide>
        <Styled.PokemonId>#{data.id}</Styled.PokemonId>
        <Styled.PokemonName>{data.name}</Styled.PokemonName>
        <Styled.CardDetailLeftSide
          source={dotsImage}
        ></Styled.CardDetailLeftSide>
        <Styled.PokemonContentType>
          {data.types.map((pokemonType) => (
            <Styled.PokemonType
              key={pokemonType.type.name}
              type={pokemonType.type.name}
            >
              <Styled.PokemonTypeText key={pokemonType.type.name}>
                {pokemonType.type.name}
              </Styled.PokemonTypeText>
            </Styled.PokemonType>
          ))}
        </Styled.PokemonContentType>
      </Styled.LeftSide>
      <Styled.RightSide>
        <Styled.PokeballDetail source={pokeballCard}></Styled.PokeballDetail>
        <Styled.PokemonImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          }}
        ></Styled.PokemonImage>
      </Styled.RightSide>
    </Styled.PokemonCard>
  );
}
