import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
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

  const ProtectedRoute = ({ children }) => {
    const { loggedInUser } = useUser();
  
    if (!loggedInUser) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  return (
    <UserProvider>
      <div className="app">
        {!isLocationHomepage && <Header />}
        <main className="wrapper">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/articles" element={<ProtectedRoute><ArticlesPage /></ProtectedRoute>} />
            <Route path="/articles/:topicName" element={<ProtectedRoute><ArticlesPage /></ProtectedRoute>} />
            <Route path="/article/:articleId" element={<ProtectedRoute><ArticlePage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
            <Route path="/post" element={<ProtectedRoute><PostArticlePage /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
