import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Styles/Carousal.css';

const Carousal = ({ image }) => {
  return (
    <div>
      <Carousel>
        {image.map(item => (
          <Carousel.Item>
            <img
              className="d-block w-100 imgstyle"
              src={item}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousal;
