import React from 'react';
import "../styles/article-item.scss"
import { formatDistanceToNow } from 'date-fns';

const ArticleItem = ({ article, isArticlePreview }) => {
  const timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });

  return (
    <div className={isArticlePreview ? 'article article_preview' : 'article article_full'}>
      <div className='article__top'>
        <p className='article__author'>
          {article.author}
        </p>
        <span className='article__date'>{timeAgo}</span>
      </div>
      <div className={isArticlePreview ? 'article__main article__main_preview' : 'article__main article__main_full'}>
        <h4 className={isArticlePreview ? 'article__title' : 'article__title article__title_full'}>{article.title}</h4>
        <img className="article__image" src={article.article_img_url} alt={`${article.topic}`} />
      </div>
      <div className='article__bottom'>
        <span className={isArticlePreview ? 'article__topic' : 'article__topic article__topic_full'}>{article.topic}</span>
        <div className='article__reactions'>
          <span className='article__comments'>{article.comment_count}</span>
          <span className='article__votes'>{article.votes}</span>
        </div>
      </div>
      {!isArticlePreview &&
        <div className='article__body'>
          {article.body}
        </div>}
    </div>
  );
};

export default ArticleItem;