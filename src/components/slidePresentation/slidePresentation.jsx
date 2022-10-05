import React from "react";
import "./slidePresentation.css"

function slidePresentation() {
  return (
    <div className="slidePresentationContainer">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carouselFlexImgText">
              <img src="/assets/post/1.jpeg" alt="..." className="carouselImage"/>
              <div className="carousel-caption d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item carouselFlexImgText">
            <div className="carouselFlexImgText">
              <img src="/assets/post/2.jpeg" alt="..." className="carouselImage"/>
              <div className="carousel-caption d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item carouselFlexImgText">
            <div className="carouselFlexImgText">
              <img src="/assets/post/3.jpeg" alt="..." className="carouselImage"/>
              <div className="carousel-caption d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default slidePresentation;
