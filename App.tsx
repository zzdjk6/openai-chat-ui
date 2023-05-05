import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";

import { FooterNavigation } from "./components/FooterNavigation/FooterNavigation";
import { InitAppData } from "./components/InitAppData/InitAppData";
import { store } from "./store/store";

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
