import React from "react";
import "../styles/order-articles.scss";

const OrderArticles = ({order, setOrder}) => {
  const handleOrderChange = () => {
    setOrder((currentOrder) => {
      return currentOrder === "asc" ? "desc" : "asc";
    });
  };

  return (
    <button className={order === "asc" ? "order order_asc" : "order order_desc"} onClick={handleOrderChange}></button>
  );
};

export default OrderArticles;