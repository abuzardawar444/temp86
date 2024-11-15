import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@mui/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() =>
   {
    if(value===0) history.push("/");
    else if (value === 1) history.push("/movies");
    else if ( value === 2) history.push("/series");
    else if ( value === 3) history.push("/search");
   },[value,history])

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
        style={{ backgroundColor: "#071e22" }}
      >
        <BottomNavigationAction style={{color:"white"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color:"white"}}  label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:"white"}}  label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:"white"}}  label="Search" icon={<SearchIcon />} />

      </BottomNavigation>
    </Box>
  );
}