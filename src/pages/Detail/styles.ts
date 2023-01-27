import styled, { css } from "styled-components/native";
import { PokemonTypeName } from ".";
import * as Progress from "react-native-progress";

type TypeProps = {
  type: PokemonTypeName;
};

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

export const ContentImage = styled.View`
  position: relative;
  top: -180px;
`;

export const PokemonImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const Content = styled.View`
  margin-top: -180px;
  display: flex;
  align-items: center;
  gap: 16px;
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

export const PokemonTypeContainer = styled.View`
  flex-direction: row;
`;

export const PokemonType = styled.View<TypeProps>`
  ${({ theme, type }) => css`
    width: 61px;
    height: 25px;

    background: ${theme.colors.boxType[type]};
    border-radius: 3px;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    margin-top: 10px;
  `}
`;

export const PokemonTypeText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text_white};
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    font-style: normal;
  `}
`;

export const DotsImage = styled.Image`
  width: 85px;
  position: absolute;
  right: -20px;
  top: 200px;
`;

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    padding: 20px;
    background-color: ${theme.colors.background};
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: -40px;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Title = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    padding: 20px;
    color: ${theme.colors.boxType[type]};
  `}
`;

export const StatsBar = styled.View`
  width: 100%;
  padding: 2px;
  flex-direction: row;
  align-items: center;
`;

export const Attributes = styled.Text`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    width: 89px;
    text-transform: capitalize;
    color: ${theme.colors.text_black};
  `}
`;

export const AttributesValue = styled.Text`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    color: ${theme.colors.detail};
    margin-left: 20px;
    width: 30px;
  `}
`;

export const ContentBar = styled.View<TypeProps>`
  ${({ theme, type }) => css`
    margin-left: 20px;
    width: 200px;
    background: #f8f8ff;
    border-radius: 4px;
  `}
`;

export const ProgressBar = styled(Progress.Bar)<TypeProps>``;

export const AbilityBox = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Ability = styled.Text`
  ${({ theme }) => css`
    padding: 5px 20px;
    text-transform: capitalize;
    color: ${theme.colors.text_black};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #212121;
  `}
`;

export const AboutSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PokemonWeightValue = styled.Text`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #212121;
`;

export const PokemonHeightValue = styled.Text`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #212121;
`;

export const PokemonAboutText = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 12px;
  color: #666666;
`;

export const PokemonSeparator = styled.View`
  width: 1px;
  height: 48px;
  background: #e0e0e0;
`;

export const AboutIcon = styled.Image`
  display: flex;
  gap: 16px;
  margin-right: 8px;
`;

export const HeightSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px;
`;
export const WeightSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px;
`;
