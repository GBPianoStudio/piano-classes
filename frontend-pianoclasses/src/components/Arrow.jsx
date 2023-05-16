import React, { useState, useEffect } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';

function ScrollToBottom() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 150) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 150) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
    <FaChevronCircleDown className="scrollTop fa-10x" onClick={scrollTop}/>
    </>
  );
}

export default ScrollToBottom;
