import * as React from 'react';
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { unavailable, unavailableLandscape } from '../../config/config';
import "./ContentModal.css";
import Carousel from "../Carousel/Carousel";

const style = {
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 2,
  color: "white",
  boxShadow: 24,
  ml: 3,
  mt: 10,
  mr: 5,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    // Example YouTube fetch code if needed later
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleOpen} className="media">{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {content && (
            <div className='mainModel'>
              <img
                className='poster_portrait'
                alt={content.Title}
                src={content.Poster !== "N/A" ? content.Poster : unavailable}
              />
              <img
                className='poster_landscape'
                alt={content.Title}
                src={unavailableLandscape}
              />
              <div className='model_details'>
                <span className='model_title'>
                  {content.Title} ({content.Year})
                </span>
                {content.Plot && (
                  <span className='content_discription'>
                    {content.Plot}
                  </span>
                )}
                <div>
                  <Carousel media_type={media_type} id={id} />
                </div>
                {/* Use this Button when video fetching logic is implemented */}
                {/* <Button
                  variant="contained"
                  color='error'
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                  startIcon={<YouTube />}
                  sx={{ '&:hover': {
                    color: 'white',
                    backgroundColor: 'red'
                  }, }}
                >
                  Watch the Trailer
                </Button> */}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}
