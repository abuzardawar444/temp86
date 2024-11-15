import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { noPicture } from '../../config/config'; // Only import what's necessary
import "./Carousel.css"

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <div className='item' key={c.imdbID}>
      <img
        src={c.Poster !== "N/A" ? c.Poster : noPicture}
        alt={c.Title}
        onDragStart={handleDragStart}
        className='item-image'
      />
      <b className='item-text'>{c.Title}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?s=movie&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      setCredits(data.Search || []);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, [media_type, id]);

  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      disableButtonsControls
      disableDotsControls
      infinite
      mouseTracking
      items={items}
    />
  );
};

export default Carousel;
