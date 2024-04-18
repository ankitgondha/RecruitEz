import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function useDataFetch(url) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token")
  useEffect(() => {
    url+=`?token=${token}`
    fetch(url)
      .then((response) => {
        console.log("res iis", response);
        if(response.status === 401){
          navigate("/")
        }
        if (!response.ok) {

          throw new Error("Network response was not ok");
          
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [url]);

  return data;
}

export default useDataFetch;
