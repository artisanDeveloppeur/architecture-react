import "./../../assets/css/slider.css"
import { useState } from "react";

const images = [
  "https://picsum.photos/seed/img1/1000/400",
  "https://picsum.photos/seed/img2/1000/400",
  "https://picsum.photos/seed/img3/1000/400",
  "https://picsum.photos/seed/img4/1000/400",
  "https://picsum.photos/seed/img5/1000/400",
  "https://picsum.photos/seed/img6/1000/400",

];

export function Slider() {
  const [current, setCurrent] = useState(0);

  function nextSlide() {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }

  function prevSlide() {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }

  return (
    <div>
      <h2>Project 1: Slider</h2>
      <div className="slider">
        <div className="left-arrow" onClick={prevSlide}>
          prev
        </div>
        <div className="right-arrow" onClick={nextSlide}>
          next
        </div>
        {images.map(
          (image, index) =>
            current === index && (
              <div key={image} className="slide">
                <picture>
                  <img src={image} alt="images" />
                  <figcaption>Image {index}</figcaption>
                </picture>
              </div>
            )
        )}
      </div>
    </div>
  );
}