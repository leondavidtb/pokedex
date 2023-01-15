import React from "react";
import { ActivityIndicator } from "react-native";
import * as Styled from "./styles";

export function Footer() {
  return (
    <Styled.Loader>
      <ActivityIndicator size={"large"} />
    </Styled.Loader>
  );
}
