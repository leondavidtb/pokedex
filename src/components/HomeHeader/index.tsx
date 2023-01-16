import React from "react";
import { View } from "react-native";

import pokeballHeader from "../../assets/img/pokeball.png";
import searchIcon from "../../assets/img/searchIcon.png";

import * as Styled from "./styles";

export function HomeHeader() {
  return (
    <>
      <Styled.Header source={pokeballHeader} />
      <Styled.Title>Pokédex</Styled.Title>
      <Styled.Subtitle>
        Search for Pokémon by name or using the National Pokédex number.
      </Styled.Subtitle>
      <Styled.SearchContainer>
        <Styled.SearchImage source={searchIcon} />
        <Styled.SearchInput placeholder="What Pokémon are you looking for?"></Styled.SearchInput>
      </Styled.SearchContainer>
    </>
  );
}
