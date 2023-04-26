import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { setupURLPolyfill } from "react-native-url-polyfill";
import { Provider } from "react-redux";

import { FooterNavigation } from "./components/FooterNavigation/FooterNavigation";
import { InitAppData } from "./components/InitAppData/InitAppData";
import { store } from "./store/store";

if (Platform.OS !== "web") {
  setupURLPolyfill();
}

// extend the theme
const theme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
});

const App: React.FC = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <InitAppData />
        <FooterNavigation />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
