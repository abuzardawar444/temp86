import axios from "axios";
import { useEffect, useState } from "react";
import CustomPaggination from "../../Paggination/CustomPaggination";
import { SingleContent } from "../../SingleContent/SingleContent";
import "./Trending.css";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const numOfPages = 10;

  const fetchdata = async () => {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?s=batman&apikey=${process.env.REACT_APP_OMDB_API_KEY}&page=${page}`
      );
      console.log("API Response:", data); // Check the API response
      if (data.Search) {
        data.Search.forEach(item => {
          console.log(`Poster URL for ${item.Title}:`, item.Poster);
        });
        setContent(data.Search);
      } else {
        setContent([]); // Handle cases where no data is returned
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <div className="topSpacing"></div>
      <div className="pageTitle">Trending</div>
      <div className="trending">
        {content && content.length > 0 ? (
          content.map((t) => (
            <SingleContent
              key={t.imdbID}
              id={t.imdbID}
              poster={t.Poster}
              title={t.Title}
              date={t.Year}
              media_type="movie"
              vote_average="N/A"
            />
          ))
        ) : (
          <p>No trending movies found.</p>
        )}
      </div>
      <CustomPaggination setPage={setPage} numOfPages={numOfPages} />
      <div className="bottom"></div>
    </div>
  );
};

export default Trending;
