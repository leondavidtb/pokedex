import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { PokemonProps } from "../../pages/Detail";
import dots from "../../assets/img/dots.png";

import * as Styled from "./styles";

export function DetailHeader({ types, id, name }: PokemonProps) {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <>
      <Styled.Header type={types[0].type.name}>
        <Styled.BackButton onPress={handleGoBack}>
          <Feather name="chevron-left" size={24} color="#fff" />
        </Styled.BackButton>
        <Styled.PokemonId>#{id}</Styled.PokemonId>
        <Styled.PokemonName>{name}</Styled.PokemonName>
        <Styled.PokemonStyledName>
          {name.toUpperCase()}
        </Styled.PokemonStyledName>

        <Styled.DotsImage source={dots} />
      </Styled.Header>
    </>
  );
}
