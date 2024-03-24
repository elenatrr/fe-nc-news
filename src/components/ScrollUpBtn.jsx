import React, { useEffect, useState } from 'react';
import "../styles/scroll-up-btn.scss"

const ScrollUpBtn = () => {
  const [isUpBtnShown, setIsUpBtnShown] = useState(false)

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsUpBtnShown(window.scrollY > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (isUpBtnShown ? <button className="scroll-up-btn" onClick={handleClick}>↑</button> : null);
};

export default ScrollUpBtn;