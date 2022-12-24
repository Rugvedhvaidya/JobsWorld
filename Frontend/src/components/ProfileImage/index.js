import React, { useState } from "react";
import "./index.css";
import Cookies from "js-cookie";

export default function ProfileImage(props) {
  const [selectedFile, setSelectedFile] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { user } = props;
    const data = new FormData(event.target);
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/upload/${user._id}`;

    const options = {
      method: "POST",
      body: data,
    };

    await fetch(apiUrl, options);
    window.location = "/profile";
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} enctype="multipart/form-data">
        <div>
          <input
            type="file"
            name="image"
            onChange={(e) => setSelectedFile(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
