import React, { useEffect } from "react";
import "../styles/sort-articles.scss";
import { useLocation, useNavigate } from "react-router-dom";

const SortArticles = ({ sortBy, setSortBy }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)

    searchParams.set("sortBy", sortBy)
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }, [sortBy, navigate, location.pathname])

  return (
    <ul className='sort'>
      <li className={sortBy === "created_at" ? "sort__item sort__item_clicked" : "sort__item"} onClick={() => setSortBy("created_at")}>new</li>
      <li className={sortBy === "comment_count" ? "sort__item sort__item_clicked" : "sort__item"} onClick={() => setSortBy("comment_count")}>hot</li>
      <li className={sortBy === "votes" ? "sort__item sort__item_clicked" : "sort__item"} onClick={() => setSortBy("votes")}>best</li>
    </ul>
  );
};

export default SortArticles;