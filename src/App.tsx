import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "@styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

const queryClient = new QueryClient();

const HomePage = lazy(() =>
  import("@pages/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);
const SearchPage = lazy(() =>
  import("@pages/SearchPage").then((module) => ({
    default: module.SearchPage,
  })),
);
const SharePage = lazy(() =>
  import("@pages/SharePage").then((module) => ({
    default: module.SharePage,
  })),
);
const LoginPage = lazy(() =>
  import("@pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const Test = lazy(() =>
  import("@components/Test/Test").then((module) => ({
    default: module.Test,
  })),
);
const Chat = lazy(() =>
  import("@components/Chat/Chat").then((module) => ({
    default: module.Chat,
  })),
);
const Header = lazy(() =>
  import("@components/common/Header/Header").then((module) => ({
    default: module.Header,
  })),
);
const Footer = lazy(() =>
  import("@components/common/Footer/Footer").then((module) => ({
    default: module.Footer,
  })),
);
const AdminLogin = lazy(() =>
  import("@components/Login/Admin/Admin").then((module) => ({
    default: module.AdminLogin,
  })),
);
const AdminSignUp = lazy(() =>
  import("@components/Login/Admin/Admin").then((module) => ({
    default: module.AdminSignUp,
  })),
);
const PetDetail = lazy(() =>
  import("@components/PetList/PetDetail/PetDetail").then((module) => ({
    default: module.PetDetail,
  })),
);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/login/admin" element={<AdminLogin />}></Route>
            <Route path="/login/admin/signup" element={<AdminSignUp />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/search/detail/:id" element={<PetDetail />}></Route>
            <Route path="/share" element={<SharePage />}></Route>
            <Route path="/test" element={<Test />}></Route>
          </Routes>
          <Chat />
          <Footer />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
