import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { components } from "./components";
import { styles } from "./styles";
import { sizes } from "./sizes";
import { typography } from "./typography";

export const theme = extendTheme({
  styles,
  colors,
  components,
  sizes,
  ...typography,
});
