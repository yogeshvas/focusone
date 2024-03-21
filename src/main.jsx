import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  extendTheme,
  useColorModeValue,
  ChakraProvider,
} from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: useColorModeValue("gray.100", "#000"),
        color: useColorModeValue("gray.800", "whiteAlpha.900"),
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* Pass the theme prop to ChakraProvider */}

      <App />
    </ChakraProvider>
  </React.StrictMode>
);
