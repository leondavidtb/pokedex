import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const Header = styled.ImageBackground`
  ${({ theme }) => css`
    height: 140px;
    margin-left: -20px;
    width: ${windowWidth}px;
    background: ${theme.colors.background};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: 32px;
    line-height: 38px;
    font-weight: bold;
    color: ${theme.colors.text_black};
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${theme.colors.detail};
  `}
`;

export const SearchContainer = styled.View`
  height: 60px;
  padding: 20px 25px;
  background: #f2f2f2;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  font-weight: 400;
`;

export const SearchInput = styled.TextInput`
  justify-content: center;
  align-items: flex-start;
`;

export const SearchImage = styled.Image`
  position: relative;
  margin-right: 12px;
`;
