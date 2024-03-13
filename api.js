import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-yolm.onrender.com/api",
});

export const fetchUsers = async () => {
  const response = await newsApi.get("/users");
  return response.data.users;
};

export const fetchArticles = async (p) => {
  const response = await newsApi.get("/articles", { params: { p } });
  return response.data;
};

export const fetchArticle = async (articleId) => {
  const response = await newsApi.get(`/articles/${articleId}`);
  return response.data.article;
};

export const fetchComments = async (articleId, p) => {
  const response = await newsApi
    .get(`/articles/${articleId}/comments`, { params: { p } });
  return response.data.comments;
};
