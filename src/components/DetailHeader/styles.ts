import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import { TypeProps } from "../../pages/Detail/styles";
const windowWidth = Dimensions.get("window").width;

export const Header = styled.View<TypeProps>`
  ${({ theme, type }) => css`
    background-color: ${theme.colors.backgroundCard[type]};
    height: 300px;
    padding: 20px;
    flex-direction: row;
    align-items: center;
    position: relative;
  `}
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

export const PokemonId = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    line-height: 19px;
    font-style: normal;
    font-weight: bold;
    color: ${theme.colors.text_white};

    position: absolute;
    top: 50px;
    left: 350px;
  `}
`;

export const PokemonName = styled.Text`
  ${({ theme }) => css`
    text-transform: capitalize;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;

    line-height: 38px;
    color: ${theme.colors.text_white};
    position: absolute;
    top: 40px;
    left: 80px;
  `}
`;

export const PokemonStyledName = styled.Text`
  position: absolute;
  font-style: normal;
  font-weight: 700;
  font-size: 100px;
  line-height: 119px;
  top: 50px;
  left: -25px;
  color: rgba(255, 255, 255, 0.1);
`;

export const DotsImage = styled.Image`
  width: 85px;
  position: absolute;
  right: -20px;
  top: 200px;
`;
