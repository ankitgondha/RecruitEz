import axios from "axios";
import React, { useState, useEffect } from "react";

const Temppage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  //   const [error, setError] = useState(null);

  const [userId, setUserId] = useState("");

  //   useEffect(() => {
  //     //  console.log("came in useEffect");
  //   }, []);

  useEffect(() => {
    const candidateId = window.sessionStorage.getItem("userId");
    setUserId(candidateId);

    console.log(userId);

    if (userId) {
      // Check if userId is truthy
      const fetchImg = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/users/profileimg?userId=${userId}`,
            {
              responseType: "arraybuffer",
            }
          );

          // Convert ArrayBuffer to Base64
          const base64Data = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          // Set PDF data URL
          setImageSrc(`data:image/png;base64,${base64Data}`);
        } catch (error) {
          console.error("Error fetching PDF data:", error);
          // setError("Error fetching PDF data. Please try again later.");
        }
      };

      fetchImg();
    }
  }, [userId]);

  //   useEffect(() => {
  //     const candidateId = window.sessionStorage.getItem("userId");
  //     setUserId(candidateId);

  //     console.log(userId);

  //     const fetchImg = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8080/users/profileimg?userId=${userId}`,
  //           {
  //             responseType: "arraybuffer",
  //           }
  //         );

  //         // Convert ArrayBuffer to Base64
  //         const base64Data = btoa(
  //           new Uint8Array(response.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );

  //         // Set PDF data URL
  //         setImageSrc(`data:image/png;base64,${base64Data}`);
  //       } catch (error) {
  //         console.error("Error fetching PDF data:", error);
  //         // setError("Error fetching PDF data. Please try again later.");
  //       }
  //     };

  //     fetchImg();
  //   }, []);

  //   //   useEffect(() => {
  //   //     const DataLoader = async () => {
  //   //       console.log("came in useEffect");
  //   //       const candidateId = window.sessionStorage.getItem("userId");
  //   //       const role = window.sessionStorage.getItem("userRole");
  //   //       let bas64data = "";
  //   //       const apiUrl = `http://localhost:8080/users/profileimg?userId=${candidateId}`;
  //   //       console.log(apiUrl);

  //   //       await axios
  //   //         .get(apiUrl)
  //   //         .then((response) => {
  //   //           // Handle successful response
  //   //           //   console.log("User data:", response);
  //   //           bas64data = response.data;
  //   //           // setCurrUser(response.data);
  //   //         })
  //   //         .catch((error) => {
  //   //           // Handle error
  //   //           console.error("Error fetching user data:", error);
  //   //         });

  //   //       console.log("Hit");
  //   //       setImageSrc(bas64data);
  //   //       let base64ToString = Buffer.from(bas64data, "base64").toString();

  //   //       setImageSrc(base64ToString);
  //   //       // Replace with your response data

  //   //       // Convert base64 string to ArrayBuffer
  //   //       //   const binaryString = window.atob(bas64data);
  //   //       //   const byteArray = new Uint8Array(binaryString.length);
  //   //       //   for (let i = 0; i < binaryString.length; i++) {
  //   //       //     byteArray[i] = binaryString.charCodeAt(i);
  //   //       //   }
  //   //       //   const arrayBuffer = byteArray.buffer;

  //   //       //   // Create Blob from ArrayBuffer
  //   //       //   const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

  //   //       //   // Create object URL from Blob
  //   //       //   const imageUrl = URL.createObjectURL(blob);

  //   //       //   // Set the image source
  //   //       //   setImageSrc(imageUrl);

  //   //       //   // Clean up on component unmount
  //   //       //   return () => {
  //   //       //     URL.revokeObjectURL(imageUrl);
  //   //       //   };
  //   //     };

  //   //     DataLoader();
  //   //   }, []);

  console.log(imageSrc);

  return (
    <div>
      <div>
        <h1>Image Display</h1>
        {imageSrc && <img src={imageSrc} alt="Image" />}
      </div>
    </div>
  );
};

export default Temppage;
