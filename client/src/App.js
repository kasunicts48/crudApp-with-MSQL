import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [newMovieReview, setNewMovieReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      const data = response.data;
      setMovieReviewList(data);
    });
  }, [movieReviewList]);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: movieReview,
    });

    setMovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: movieReview },
    ]);
    alert("Successful Insert!");
    setMovieName("");
    setMovieReview("");
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
    alert("Delete Successful");
  };

  const updateReview = (movieName) => {
    Axios.put(`http://localhost:3001/api/update/`, {
      movieName: movieName,
      movieReview: newMovieReview,
    });
    // ${movieName}
  };

  return (
    <div className="App">
      <h2>Curd Application</h2>
      <div>
        <label>movie name</label>
        <input
          type="text"
          name="movieName"
          value={movieName}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        ></input>
        <br />
        <br />
        <label>movie review</label>
        <input
          type="text"
          name="movieReview"
          value={movieReview}
          onChange={(e) => {
            setMovieReview(e.target.value);
          }}
        ></input>
        <br />
        <br />
        <button onClick={submitReview}>Submit</button>
      </div>

      <div>
        <h2>Tabele Data</h2>
        {movieReviewList.map((val, key) => {
          return (
            <div
              key={key}
              style={{
                border: "1px solid #000",
                borderRadius: "10px",
                marginBottom: "10px",
                marginLeft: "auto",
                marginRight: "auto",
                width: "40%",
                justifyContent: "center",
              }}
            >
              <h3> Movie Name : {val.moviename} </h3>
              <h4> Movie Review : {val.moviereview} </h4>

              <button
                onClick={() => {
                  deleteReview(val.moviename);
                }}
              >
                Delete
              </button>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="update"
                  onChange={(e) => {
                    setNewMovieReview(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateReview(val.moviename);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
