import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

const customConfig = defineConfig({
  globalCss: {
    body: {
      backgroundColor: "#ffffff",
      color: "#1c0b03",
      padding: "50px",
      height: "100%",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Open Sans', sans-serif` },
        body: { value: `'Raleway', sans-serif` },
      },
      colors: {
        primary: {
          light: { value: "#e0ca6e" },
          dark: { value: "#b59d3c" },
        },
        secondary: { value: "#b85c2a" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
