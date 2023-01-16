import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
