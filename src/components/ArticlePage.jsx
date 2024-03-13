import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleItem from './ArticleItem';
import { fetchArticle } from '../../api';
import Loader from './Loader';
import CommentList from "./CommentList"
import '../styles/article-page.scss'

const ArticlePage = () => {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    fetchArticle(articleId)
      .then((article => {
        setArticle(article)
      }))
  }, [])

  return !article ? <Loader /> : (
    <div className='article-page'>
      <ArticleItem article={article} isArticlePreview={false} />
      <CommentList articleId={articleId} commentCount={article?.comment_count}/>
    </div>
  );
};

export default ArticlePage;