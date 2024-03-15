import React from "react";
import "../styles/sort-articles.scss";

const SortArticles = ({ sortBy, setSortBy }) => {
  return (
    <ul className='sort'>
      <li className={sortBy === "created_at" ? "sort__item sort__item_clicked" : "sort__item"} onClick={() => setSortBy("created_at")}>new</li>
      <li className={sortBy === "comment_count" ? "sort__item sort__item_clicked" : "sort__item"} onClick={() => setSortBy("comment_count")}>hot</li>
      <li className={sortBy === "votes" ? "sort__item sort__item_clicked" : "sort__item"} onClick={() => setSortBy("votes")}>best</li>
    </ul>
  );
};

export default SortArticles;