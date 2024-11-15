import axios from "axios";
import { useEffect, useState } from "react";
import "../Trending/Trending.css";
import { SingleContent } from "../../SingleContent/SingleContent";
import CustomPaggination from "../../Paggination/CustomPaggination";
import Genres from "../../Genres/Genres";
import useGenre from "../../Hooks/useGenre";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?s=movie&apikey=${process.env.REACT_APP_OMDB_API_KEY}&page=${page}`
      );
      console.log(data); // Inspect the API response
      if (data.Search) {
        setContent(data.Search);
        setNumOfPages(Math.ceil(data.totalResults / 10)); // OMDB returns total results count, typically 10 results per page
      } else {
        setContent([]);
        setNumOfPages(0); // Handle no results case
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreForURL]);

  return (
    <div>
      <div className="topSpacing"></div>
      <div className="pageTitle">Movies</div>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content.length > 0 ? (
          content.map((t) => (
            <SingleContent
              key={t.imdbID}
              id={t.imdbID}
              poster={t.Poster}
              title={t.Title}
              date={t.Year}
              media_type="movie"
              vote_average="N/A" // OMDB doesn't provide a vote average, so we use a placeholder
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      <CustomPaggination setPage={setPage} numOfPages={numOfPages} />
      <div className="bottom"></div>
    </div>
  );
};

export default Movies;
