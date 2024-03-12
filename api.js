import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-yolm.onrender.com/api",
});

export const fetchUsers = () => {
  return newsApi.get("/users").then((response) => {
    return response.data.users;
  });
};

export const fetchArticles = (p) => {
  return newsApi.get("/articles", { params: { p } }).then((response) => {
    return response.data;
  });
};

export const fetchArticle = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then((response) => {
    return response.data.article;
  });
};
