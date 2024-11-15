import axios from "axios"
import { useEffect } from "react";
import { Chip } from '@mui/material';

const Genres = ({
    selectedGeneres,
    setSelectedGeneres,
    genres,
    setGenres,
    type,
    setPage,
}) => {

    const handleAdd = (genre) => {
        setSelectedGeneres([...selectedGeneres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
      };

    const handleDelete = (genre) => {
        setSelectedGeneres(selectedGeneres.filter((m) => m.id !==  genre.id));
        setGenres([...genres,genre]);
        setPage(1);
      };

    
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_DB_API_KEY}&language=en-US`);
        
        setGenres(data.genres);
    };
 
    useEffect(() => {
      fetchGenres();
      // eslint-disable-next-line
    },[])


   
     
    

  return (

    <div style={{padding : "6px 0"}}>
        {selectedGeneres && selectedGeneres.map((genre) => <Chip label={genre.name} 
        color="primary" 
        sx={{ margin: 0.4 }}
        key={genre.id}
        clickable
        onDelete={() => handleDelete(genre)} 
        />)}
        {genres.map((genre) => <Chip label={genre.name} 
        variant="outlined"
        color="primary" 
        sx={{ margin: 0.4 , backgroundColor:'	#D8D8D8'}}
        key={genre.id}
        clickable
        onClick={() => handleAdd(genre)}
        />)}
    </div>
  )
  };

export default Genres