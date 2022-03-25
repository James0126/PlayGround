import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitChains from "./utils/contexts/ChainsContext";
import App from "./app/App";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <InitChains>
            <Routes>
              <Route path="/*" element={<App />} />
              <Route path=":network/*" element={<App />} />
            </Routes>
          </InitChains>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
