import React from 'react'
import Slider from 'react-slick'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import Banner1 from '../../public/images/banner1.jpg'
import Banner2 from '../../public/images/banner2.jpg'
import Banner3 from '../../public/images/banner3.jpg'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './HomePage.css';
import Categories from '../../components/Home/Categories'
import NewArrivals from '../../components/Home/NewArrivals/NewArrivals'
import Services from '../../components/Home/Services'
import Sales from '../../components/Home/Sales'

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <div className="homepage-slider">
        <Slider {...settings}>
          <div>
            <img src={Banner1} alt="Banner 1" className="slider-image" />
          </div>
          <div>
            <img src={Banner2} alt="Banner 2" className="slider-image" />
          </div>
          <div>
            <img src={Banner3} alt="Banner 3" className="slider-image" />
          </div>
        </Slider>
      </div>
      <div className='flex items-center justify-between py-4 md:py-10'>
        <div className='hidden  md:flex flex-col gap-3 justify-center items-start font-medium text-5xl'>
          <div><p>Simply Unique/</p></div>
          <div><p>Simply Better.</p></div>
        </div>
        <div className='flex flex-col gap-1'>
          <div><p className='text-sm font-medium text-gray-500'><span className='text-black font-bold'>Mens Cart</span> is a men's fashion store</p></div>
          <div><p className='text-sm font-medium text-gray-500'>India. Est since 2024</p></div>
        </div>
      </div>
      {/* categories section */}
      <Categories />
      {/* New Arrivals section */}
      <NewArrivals />
      {/* Services section */}
      <Services />
      {/* Sales section */}
      <Sales />
    </div>

  )
}

export default HomePage

// Custom Arrow Components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <FaArrowRight className='arrow-icon' />
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <FaArrowLeft className='arrow-icon' />
    </div>
  );
}
