import { Routes, Route, useLocation } from 'react-router-dom';
import WelcomePage from "./components/WelcomePage"
import "./styles/app.scss"
import { UserProvider } from './contexts/UserContext';
import ArticlesPage from './components/ArticlesPage';
import UserProfilePage from './components/UserProfilePage';
import PostArticlePage from './components/PostArticlePage';
import Header from './components/Header';
import ArticlePage from './components/ArticlePage';

function App() {
  const location = useLocation()
  const isLocationHomepage = location.pathname === "/"

  return (
    <UserProvider>
      <div className="app">
        {!isLocationHomepage && <Header />}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/post" element={<PostArticlePage />} />
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App
