import React, { useState } from "react";
import "../styles/post-article.scss";
import { postArticle } from "../../api";
import { useUser } from "../contexts/UserContext";
import SubmitButton from "./SubmitButton";
import Loader from "./Loader";

const PostArticlePage = ({topics}) => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleTopic, setArticleTopic] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleImg, setArticleImg] = useState("");
  const [submitStatus, setSubmitStatus] = useState({ isSubmitting: false, isSubmitted: false, isFailed: false });
  const { loggedInUser } = useUser();
  const isSubmitActive = articleTitle && articleTopic && articleBody && loggedInUser && articleImg;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(current => ({ ...current, isSubmitting: true}));

    if (isSubmitActive && !submitStatus.isSubmitting) {
      postArticle(
        articleTitle,
        articleTopic,
        loggedInUser.username,
        articleBody,
        articleImg
      )
        .then(() => {
          setArticleTitle("");
          setArticleTopic("");
          setArticleBody("");
          setArticleImg("");
          setSubmitStatus(current => ({ ...current, isSubmitting: false, isSubmitted: true }));
        })
        .catch(() => {
          setSubmitStatus(current => ({ ...current, isSubmitting: false, isFailed: true }));
        })
        .finally(() => {
          setTimeout(() => {
            setSubmitStatus(current => ({ ...current, isSubmitted: false, isFailed: false }));
          }, 3000);
        });
    }
  };

  return (
    <div className="post-article">
      <h2 className="post-article__title">Create a New Article</h2>
      <form onSubmit={handleSubmit} className="post-article__form">
        <input
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
          className="post-article__field post-article__field_input"
          placeholder="Title"
          type="text"
          id="base-input"
          maxLength={80}
          required
        />
        <input
          value={articleImg}
          onChange={(e) => setArticleImg(e.target.value)}
          className="post-article__field post-article__field_input"
          placeholder="Image URL"
          type="url"
          id="base-input"
          maxLength={200}
          required
        />
        <textarea
          value={articleBody}
          onChange={(e) => setArticleBody(e.target.value)}
          className="post-article__field post-article__field_textarea"
          placeholder="What would you like to write about?"
          id="base-input"
          type="text"
          maxLength="1400"
          required
        />
        <div className="post-article__topics">
          {topics ? topics.map((topic) => {
            return (
              <div key={topic.slug} className="post-article__tag">
                <input
                  className="post-article__topic"
                  type="checkbox"
                  id={topic.slug}
                  name="articleTopics"
                  value={topic.slug}
                  checked={articleTopic === topic.slug}
                  onChange={() => setArticleTopic(topic.slug)}
                />
                <label htmlFor={topic.slug}>#{topic.slug}</label>
              </div>
            );
          }) : <Loader/>}
        </div>
        <div className="post-article__btn-container">
          <SubmitButton submitStatus={submitStatus} isActive={isSubmitActive}/>
        </div>
      </form>
    </div>
  );
};

export default PostArticlePage;