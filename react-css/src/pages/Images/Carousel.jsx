import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./../../assets/css/carousel.css"




export const Carousel = ({ data }) => {
  const [slideCarousel, setSlideCarousel] = useState(0);

  const nextSlideCarousel = () => {
    setSlideCarousel(slideCarousel === data.length - 1 ? 0 : slideCarousel + 1);
  };

  const prevSlideCarousel = () => {
    setSlideCarousel(slideCarousel === 0 ? data.length - 1 : slideCarousel - 1);
  };

  return (
    <div>
      <h2>Project 2 : Carousel with indicators</h2>
      <div className="carousel">
        <BsArrowLeftCircleFill onClick={prevSlideCarousel} className="arrow arrow-left" />
        {data.map((item, idx) => {
          return (
            <img
              src={item.src}
              alt={item.alt}
              key={idx}
              className={slideCarousel === idx ? "slide" : "slide slide-hidden"}
            />
          );
        })}
        <BsArrowRightCircleFill
          onClick={nextSlideCarousel}
          className="arrow arrow-right"
        />
        <span className="indicators">
          {data.map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                  slideCarousel === idx ? "indicator" : "indicator indicator-inactive"
                }
                onClick={() => setSlideCarousel(idx)}
              ></button>
            );
          })}
        </span>
      </div>
    </div>

  );
};
