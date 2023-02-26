import axios, { AxiosError } from "axios";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import store from "./store/index";

let numberOfAjaxCAllPending = 0;
let persistor = persistStore(store);

// Asios Request Interceptor

axios.interceptors.request.use(
  (config) => {
    numberOfAjaxCAllPending++;
    toast.loading("Loading...", { containerId: "top", toastId: "loading" });
    return config;
  },
  (error) => {
    toast.error<AxiosError>(error.response?.data.message || error.message, {
      containerId: "bottom",
    });
    return Promise.reject(error);
  }
);

// Axios Response Interceptor

axios.interceptors.response.use(
  (response) => {
    numberOfAjaxCAllPending--;
    if (numberOfAjaxCAllPending == 0) toast.dismiss("loading");
    return response;
  },
  (error) => {
    numberOfAjaxCAllPending--;
    if (numberOfAjaxCAllPending == 0) toast.dismiss("loading");
    toast.error<AxiosError>(error.response?.data.message || error.message, {
      containerId: "bottom",
    });
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
