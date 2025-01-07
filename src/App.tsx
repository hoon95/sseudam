import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { SearchPage } from "@pages/SearchPage";
import { SharePage } from "@pages/SharePage";
import { LoginPage } from "@pages/LoginPage";
import { ChatPage } from "@pages/ChatPage";
import { Header } from "@components/common/Header/Header";
import { Footer } from "@components/common/Footer/Footer";
import { AdminLogin, AdminSignUp } from "@components/Login/Admin/Admin";
import { PetDetail } from "@components/PetList/PetDetail/PetDetail";
import { GlobalStyle } from "@styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/login/admin" element={<AdminLogin />}></Route>
          <Route path="/login/admin/signup" element={<AdminSignUp />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/search/detail/:id" element={<PetDetail />}></Route>
          <Route path="/share" element={<SharePage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
