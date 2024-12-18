import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { SearchPage } from "@pages/SearchPage";
import { SharePage } from "@pages/SharePage";
import { LoginPage } from "@pages/LoginPage";
import { Header } from "@components/common/Header/Header";
import { GlobalStyle } from "@styles/GlobalStyle";

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/share" element={<SharePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
      <Header />
    </BrowserRouter>
  );
};
