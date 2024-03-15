import React, { useState } from "react";
import ArticleList from "./ArticleList";
import TopicList from "./TopicList";
import { useParams } from "react-router-dom";
import SortArticles from "./SortArticles";
import OrderArticles from "./OrderArticles";
import "../styles/articles-page.scss";

const ArticlesPage = () => {
  const { topicName } = useParams();
  const [areArticlesLoading, setAreArticlesLoading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");
  const [articles, setArticles] = useState([]);
  const isLoaderShown = areArticlesLoading && articles.length === 0;

  return (
    <div className='articles-page'>
      <div className="articles-page__top">
        <TopicList topicName={topicName || null} areArticlesLoading={areArticlesLoading} />
        {!isLoaderShown && <div className="articles-page__sort">
          <OrderArticles areArticlesLoading={areArticlesLoading} order={order} setOrder={setOrder} />
          <SortArticles areArticlesLoading={areArticlesLoading} sortBy={sortBy} setSortBy={setSortBy} />
        </div>}
      </div>
      <ArticleList
        articles={articles}
        setArticles={setArticles}
        isLoaderShown={isLoaderShown}
        topicName={topicName || null}
        areArticlesLoading={areArticlesLoading}
        setAreArticlesLoading={setAreArticlesLoading}
        order={order}
        sortBy={sortBy}
      />
    </div>
  );
};

export default ArticlesPage;