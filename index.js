import { registerRootComponent } from "expo";
import { Platform } from "react-native";

import App from "./App";

if (Platform.OS !== "web") {
  console.log(`Platform.OS: `, Platform.OS);

  const { polyfill: polyfillEncoding } = require("react-native-polyfill-globals/src/encoding");
  const { polyfill: polyfillFetch } = require("react-native-polyfill-globals/src/fetch");
  const { polyfill: polyfillReadableStream } = require("react-native-polyfill-globals/src/readable-stream");
  const { polyfill: polyfillURL } = require("react-native-polyfill-globals/src/url");
  polyfillFetch();
  polyfillURL();
  polyfillEncoding();
  polyfillReadableStream();
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
