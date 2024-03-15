import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import WelcomePage from "./components/WelcomePage";
import ArticlesPage from "./components/ArticlesPage";
import UserProfilePage from "./components/UserProfilePage";
import PostArticlePage from "./components/PostArticlePage";
import Header from "./components/Header";
import ArticlePage from "./components/ArticlePage";
import "./styles/app.scss";
import NotFound from "./components/NotFound";

function App() {
  const location = useLocation();
  const isLocationHomepage = location.pathname === "/";

  return (
    <UserProvider>
      <div className="app">
        {!isLocationHomepage && <Header />}
        <main className="wrapper">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:topicName" element={<ArticlesPage />} />
            <Route path="/article/:articleId" element={<ArticlePage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/post" element={<PostArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
