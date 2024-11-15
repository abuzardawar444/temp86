import "../Trending/Trending.css";
import { TextField, ThemeProvider } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import axios from "axios";
import { SingleContent } from "../../SingleContent/SingleContent";
import CustomPaggination from "../../Paggination/CustomPaggination";

const color = grey[400];

const darktheme = createTheme({
  palette: {
    primary: {
      main: color
    },
    text: {
      primary: '#ffffff' // Set text color to white
    },
    background: {
      paper: '#424242', // Set background color to dark to match theme
    }
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?s=${searchText}&type=${type ? "series" : "movie"}&apikey=${process.env.REACT_APP_OMDB_API_KEY}&page=${page}`
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
    if (searchText) {
      fetchSearch();
    }
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <div className="topSpacing"></div>
      <div style={{ display: "flex", paddingTop: 30 }}>
        <ThemeProvider theme={darktheme}>
          <FormControl sx={{ width: '40ch' }}>
            <TextField
              label="Search"
              variant="filled"
              focused
              onChange={(e) => { setSearchText(e.target.value); }}
              InputProps={{
                style: {
                  color: 'white', // Set typing text color to white
                },
              }}
              InputLabelProps={{
                style: {
                  color: 'white', // Set label text color to white
                },
              }}
            />
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            style={{ marginLeft: 10, paddingRight: 5, backgroundColor: '#D8D8D8' }}
            onClick={fetchSearch}
          >
            Search
          </Button>
        </ThemeProvider>
      </div>
      <div style={{ paddingTop: 10 }}>
        <Tabs
          value={type}
          textColor="primary"
          indicatorColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab sx={{ width: '50%', color: 'white' }} label="SEARCH MOVIES" />
          <Tab sx={{ width: '50%', color: 'white' }} label="SEARCH TV SERIES" />
        </Tabs>
      </div>
      <div>
        <div className="trending">
          {content.length > 0 ? (
            content.map((t) => (
              <SingleContent
                key={t.imdbID}
                id={t.imdbID}
                poster={t.Poster}
                title={t.Title}
                date={t.Year}
                media_type={type ? "series" : "movie"}
                vote_average="N/A" // OMDB doesn't provide a vote average, so we use a placeholder
              />
            ))
          ) : (
            searchText && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
          )}
        </div>
        {numOfPages > 1 && <CustomPaggination setPage={setPage} numOfPages={numOfPages} />}
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default Search;
