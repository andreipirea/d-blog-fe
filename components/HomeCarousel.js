import Slider from "react-slick";
import carouselStyles from "../styles/HomeCarousel.module.scss";
// import { baseUrl } from "./config";
import Image from "next/image";
import slide1Img from "../public/images/pexels-jessica-ticozzelli.png";
import slide2Img from "../public/images/pexels-kindel-media.png";
import slide3Img from "../public/images/pexels-jill-wellington.png";


const HomeCarousel = () => {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 1000,
    };
    return (
      <div className={carouselStyles.slider_container}>
        <Slider {...settings}>
          <div className={carouselStyles.slide_wrapper}>
            <Image alt="img1" src={slide1Img}  />
          </div>
          <div className={carouselStyles.slide_wrapper}>
            <Image alt="img2" src={slide2Img}  />
          </div>
          <div className={carouselStyles.slide_wrapper}>
            <Image alt="img2" src={slide3Img}  />
          </div>
        </Slider>
      </div>
    );
}

export default HomeCarousel;