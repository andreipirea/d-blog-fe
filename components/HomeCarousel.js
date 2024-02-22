import Slider from "react-slick";
import Link from "next/link";
import carouselStyles from "../styles/HomeCarousel.module.scss";
import ReactHtmlParser from "react-html-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { Skeleton } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteSlide } from "../redux/actions/slidesActions";
import { useRouter } from "next/router";

const HomeCarousel = () => {
  const fetchedSlides = useSelector((state) => state.slidesReducer);
  // const fetchedSlides = slides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(-1);
  const [slideId, setSlideId] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const userStatus = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (fetchedSlides[currentSlideIndex]) {
      setSlideId(fetchedSlides[currentSlideIndex].id);
    } else {
      setSlideId(fetchedSlides[0] && fetchedSlides[0].id);
    }
  }, [currentSlideIndex]);

  const deleteHandler = () => {
    let answer = confirm("Sigur vrei sa stergi slide-ul?");
    if (answer) {
      dispatch(deleteSlide(slideId));
      router.push("/");
    } else {
      return;
    }
  };

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
    beforeChange: (current, next) => setCurrentSlideIndex(next)
    // afterChange: (current) => console.log(current)
  };
  return (
    <div className={carouselStyles.slider_container}>
      {!fetchedSlides?.length ? 
      <Link href="/addEditSlide">
      <Skeleton variant="rectangular" width={5000} height={600} />
        {/* <LibraryAddIcon
          style={{
            fontSize: 100,
            color: "#009933",
            cursor: "pointer"
          }}
        /> */}
      </Link> :
        <Slider {...settings}>
          {fetchedSlides.map((slide, index) => {
            return (
              <div
                data-index={index}
                key={slide}
                className={carouselStyles.slide_wrapper}
              >
                <div className={carouselStyles.slider_overlay}></div>
                {slide.imageUrl && (
                  <img
                    className={carouselStyles.slide_image}
                    alt={`${process.env.API_URL}/${slide.imageUrl}`}
                    src={`${process.env.API_URL}/${slide.imageUrl}`}
                  />
                )}
                <div className={carouselStyles.content_container}>
                  <div className={carouselStyles.title_container}>
                    {ReactHtmlParser(slide.title)}
                  </div>
                  <div className={carouselStyles.text_container}>
                    {ReactHtmlParser(slide.content)}
                  </div>
                </div>
                {userStatus.user && userStatus.user.userStatus === "admin" && (
                  <div className={carouselStyles.admin_icons}>
                    <Link href="/addEditSlide">
                      <LibraryAddIcon
                        style={{
                          fontSize: 100,
                          color: "#009933",
                          cursor: "pointer"
                        }}
                      />
                    </Link>
                    <Link
                      {...(slideId !== undefined
                        ? { href: `/addEditSlide/?slideId=${slideId}` }
                        : { href: `/` })}
                    >
                      <EditIcon
                        // onClick={() => getSlideId(slide.id)}
                        style={{
                          fontSize: 100,
                          color: "blue",
                          cursor: "pointer"
                        }}
                      />
                    </Link>
                    <DeleteForeverIcon
                      onClick={deleteHandler}
                      style={{
                        fontSize: 100,
                        color: "#ff0000",
                        cursor: "pointer"
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Slider>

      }
    </div>
  );
};

export default HomeCarousel;
