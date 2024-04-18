import { Carousel } from "./Images/Carousel.jsx";
import { Slider } from "./Images/Slider.jsx";

const slidesCarousel = [
  {
    "src": "https://picsum.photos/seed/img1/600/400",
    "alt": "Image 1 for carousel"
  },
  {
    "src": "https://picsum.photos/seed/img2/600/400",
    "alt": "Image 2 for carousel"
  },
  {
    "src": "https://picsum.photos/seed/img3/600/400",
    "alt": "Image 3 for carousel"
  },
  {
    "src": "https://picsum.photos/seed/img4/600/400",
    "alt": "Image 4 for carousel"
  },
  {
    "src": "https://picsum.photos/seed/img5/600/400",
    "alt": "Image 5 for carousel"
  },
  {
    "src": "https://picsum.photos/seed/img6/600/400",
    "alt": "Image 6 for carousel"
  }
]
export function Images() {


  return (
    <div>
      <h1>Mes images</h1>
      <Slider />
      <br /><br /><br />
      <Carousel data={slidesCarousel} />
    </div>
  );
}