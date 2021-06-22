import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Carousal = ({ image }) => {
  return (
    <div>
      <Carousel>
        {image.map((item) => (
          <Carousel.Item>
            <img className="d-block w-100" src={item} alt="First slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousal;
