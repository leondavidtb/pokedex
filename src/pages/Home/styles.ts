import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

export const SearchContainer = styled.View`
  height: 60px;
  padding: 20px 25px;
  background: #f2f2f2;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const SearchInput = styled.TextInput`
  justify-content: center;
  align-items: flex-start;
`;

export const SearchImage = styled.Image`
  position: relative;
  margin-right: 12px;
`;
