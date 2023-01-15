import React from "react";

import pokeballHeader from "../../assets/img/pokeball.png";

import * as Styled from "./styles";

export function HomeHeader() {
  return (
    <>
      <Styled.Header source={pokeballHeader} />
      <Styled.Title>Pokédex</Styled.Title>
      <Styled.Subtitle>
        Search for Pokémon by name or using the National Pokédex number.
      </Styled.Subtitle>
    </>
  );
}
