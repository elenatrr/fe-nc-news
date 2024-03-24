import React, { useEffect } from "react";
import "../styles/order-articles.scss";
import { useLocation, useNavigate } from "react-router-dom";

const OrderArticles = ({ order, setOrder }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOrderChange = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder)
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set("order", order);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [order, navigate, location.pathname])

  return (
    <button className={order === "asc" ? "order order_asc" : "order order_desc"} onClick={handleOrderChange}></button>
  );
};

export default OrderArticles;