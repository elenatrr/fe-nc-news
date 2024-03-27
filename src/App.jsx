import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import WelcomePage from "./components/WelcomePage";
import ArticlesPage from "./components/ArticlesPage";
import UserProfilePage from "./components/UserProfilePage";
import PostArticlePage from "./components/PostArticlePage";
import Header from "./components/Header";
import ArticlePage from "./components/ArticlePage";
import "./styles/app.scss";
import ErrorPage from "./components/ErrorPage";
import { useState } from "react";

function App() {
  const location = useLocation();
  const isLocationHomepage = location.pathname === "/";
  const [topics, setTopics] = useState(null);

  return (
    <UserProvider>
      <div className="app">
        {!isLocationHomepage && <Header />}
        <main className="wrapper">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/articles" element={<ArticlesPage topics={topics} setTopics={setTopics}/>} />
            <Route path="/articles/:topicName" element={<ArticlesPage topics={topics} setTopics={setTopics}/>} />
            <Route path="/article/:articleId" element={<ArticlePage topics={topics} setTopics={setTopics}/>} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/post" element={<PostArticlePage topics={topics}/>} />
            <Route path="*" element={<ErrorPage isNotFound={true}/>} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
