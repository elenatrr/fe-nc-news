import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleItem from "./ArticleItem";
import { fetchArticle } from "../../api";
import Loader from "./Loader";
import CommentList from "./CommentList";
import "../styles/article-page.scss";
import CommentForm from "./CommentForm";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isNonExistentId, setIsNonExistentId] = useState(false);

  useEffect(() => {
    setIsNonExistentId(false);

    fetchArticle(articleId)
      .then((article => {
        setArticle(article);
      }))
      .catch((err) => {
        if (err.response.status === 404 ) {
          setIsNonExistentId(true);
        }
      });
  }, []);

  return !article && !isNonExistentId
    ? <Loader />
    : isNonExistentId
      ? <div className="wrapper">Sorry, the selected article &quot;{articleId}&quot; does not exist.</div>
      : (
        <div className='article-page'>
          <ArticleItem article={article} isArticlePreview={false} />
          <CommentForm setComments={setComments} articleId={articleId}/>
          <CommentList comments={comments} setComments={setComments} articleId={articleId} commentCount={article?.comment_count}/>
        </div>
      );
};

export default ArticlePage;