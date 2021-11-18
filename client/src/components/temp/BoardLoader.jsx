import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosConfig";

export default function BoardLoader() {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("/board/5-around-the-corner");
      console.log(response);
      setImageUrl(response.data.url);
    })();
  });

  return (
    <div>
      {imageUrl && (
        <img src={process.env.REACT_APP_API_URL + imageUrl} alt="" />
      )}
    </div>
  );
}
