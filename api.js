import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-yolm.onrender.com/api",
});

export const fetchUsers = async () => {
  const response = await newsApi.get("/users");
  return response.data.users;
};

export const fetchArticles = async (p, topic, order, sortBy) => {
  const response = await newsApi.get("/articles", { params: { p, topic, order, sort_by: sortBy } });
  return response.data;
};

export const fetchArticle = async (articleId) => {
  const response = await newsApi.get(`/articles/${articleId}`);
  return response.data.article;
};

export const fetchComments = async (articleId, p) => {
  const response = await newsApi.get(`/articles/${articleId}/comments`, {
    params: { p },
  });
  return response.data.comments;
};

export const patchArticle = async (articleId, inc_votes) => {
  const response = await newsApi.patch(`/articles/${articleId}`, { inc_votes });
  return response.data.article;
};

export const postComment = async (articleId, username, body) => {
  const response = await newsApi.post(`/articles/${articleId}/comments`, {
    username,
    body,
  });
  return response.data.comment;
};

export const deleteComment = async (commentId) => {
  await newsApi.delete(`/comments/${commentId}`);
};

export const fetchTopics = async () => {
  const response = await newsApi.get("/topics");
  return response.data.topics;
};

export const postArticle = async (title, topic, author, body, article_img_url) => {
  const response = await newsApi.post("/articles", {
    title,
    topic,
    author,
    body,
    article_img_url
  });
  return response.data.article;
};