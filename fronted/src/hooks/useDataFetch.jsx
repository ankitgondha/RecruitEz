import React, { useState, useEffect } from 'react';

function useDataFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch(url)
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      })
    
    }, [url]);

    return data;
    
}

export default useDataFetch;