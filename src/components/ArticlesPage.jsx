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

  return (
    <div className='articles-page'>
      <div className="articles-page__top">
        <TopicList topicName={topicName || null} areArticlesLoading={areArticlesLoading}/>
        <div className="articles-page__sort">
          <OrderArticles order={order} setOrder={setOrder}/>
          <SortArticles sortBy={sortBy} setSortBy={setSortBy}/>
        </div>
      </div>
      <ArticleList
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