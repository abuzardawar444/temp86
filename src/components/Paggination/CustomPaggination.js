import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';

export default function BasicPagination({ setPage, numOfPages }) {
  const theme = useTheme();

  const handlePageChange = (e, page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div>
      {numOfPages > 1 && (
        <Pagination
          onChange={handlePageChange}
          hidePrevButton
          hideNextButton
          count={numOfPages > 450 ? 450 : numOfPages}
          color="primary"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '& .MuiPaginationItem-root': {
              color: '#ffffff', // Set text color for all pagination items to white
              '&.Mui-selected': {
                color: '#ffffff', // Ensure selected page text color is white
                backgroundColor: theme.palette.primary.main, // Background color for selected page
              },
            },
          }}
        />
      )}
    </div>
  );
}
