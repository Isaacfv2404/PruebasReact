import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image4 from './image4.jpg';
import image1 from './image1.jpg';

import './ImageCarousel.css';

const images = [image4, image1];

const ImageCarousel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Hace que el carrusel se mueva automáticamente
    autoplaySpeed: 4000, // Ajusta la velocidad de transición (en milisegundos)
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`imagen ${index + 1}`}
              onClick={() => setModalIsOpen(true)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
