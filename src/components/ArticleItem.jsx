import React, { useState } from "react";
import "../styles/article-item.scss";
import { formatDistanceToNow } from "date-fns";
import VoteReactions from "./VoteReactions";

const ArticleItem = ({ article, isArticlePreview }) => {
  const timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });
  const [votes, setVotes] = useState(article.votes);
  const areVotesNegative = votes < 0;

  return (
    <div className={isArticlePreview ? "article article_preview" : "article article_full"}>
      <div className='article__top'>
        <p className='article__author'>
          {article.author}
        </p>
        <span className='article__date'>{timeAgo}</span>
      </div>
      <div className={isArticlePreview ? "article__main article__main_preview" : "article__main article__main_full"}>
        <h4 className={isArticlePreview ? "article__title" : "article__title article__title_full"}>{article.title}</h4>
        <img className="article__image" src={article.article_img_url} alt={`${article.topic}`} />
      </div>
      <div className='article__bottom'>
        <span className={isArticlePreview ? "article__topic" : "article__topic article__topic_full"}>{article.topic}</span>
        {isArticlePreview
          ? <span className={areVotesNegative ? "article__votes article__votes_negative" : "article__votes"}>{article.votes}</span>
          : <VoteReactions votes={votes} setVotes={setVotes} areVotesNegative={areVotesNegative} articleId={article.article_id} />}
      </div>
      {!isArticlePreview &&
        <div className='article__body'>
          {article.body}
        </div>}
    </div>
  );
};

export default ArticleItem;