import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterGamePage from "./pages/EnterGamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MakeAdminPage from "./pages/MakeAdminPage";
import MatchHistoryPage from "./pages/MatchHistoryPage";
import SignupCard from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { bgColor, theme } from "./theme";
import SignInPage from "./pages/SigninPage";

document.body.style.backgroundColor = bgColor;
const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/enter-game" element={<EnterGamePage />} />
          <Route path="/make-admin" element={<MakeAdminPage />} />
          <Route path="match-history/:id" element={<MatchHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
