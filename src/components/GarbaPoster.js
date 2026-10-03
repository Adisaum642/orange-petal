import React from 'react';
import './GarbaBanner.css';

import garbaPoster from '../assets/garbaPoster.jpeg';
import garbaPosterMobile from '../assets/moblie_view.jpeg';

const GarbaBanner = () => {
  return (
    <picture className="banner-container2">
      <source
        media="(max-width: 768px)"
        srcSet={garbaPosterMobile}
      />

      <img
        src={garbaPoster}
        alt="Garba Night"
        className="garba-banner-image"
      />
    </picture>
  );
};

export default GarbaBanner;