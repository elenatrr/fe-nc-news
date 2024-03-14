import React, { useState } from "react";
import ArticleList from "./ArticleList";
import TopicList from "./TopicList";
import { useParams } from "react-router-dom";

const ArticlesPage = () => {
  const { topicName } = useParams();
  const [areArticlesLoading, setAreArticlesLoading] = useState(false);

  return (
    <main className='wrapper'>
      <TopicList topicName={topicName || null} areArticlesLoading={areArticlesLoading}/>
      <ArticleList topicName={topicName || null} areArticlesLoading={areArticlesLoading} setAreArticlesLoading={setAreArticlesLoading}/>
    </main>
  );
};

export default ArticlesPage;