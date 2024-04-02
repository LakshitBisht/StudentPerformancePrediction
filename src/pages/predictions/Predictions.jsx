/* eslint-disable react/prop-types */
import "./Predictions.css";
import { useSelector } from "react-redux";
import {
  selectPredictions,
  clearPredictionsDB,
  removePredictionsDB,
} from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

function Predictions({ user }) {
  const totalPredictions = useSelector(selectPredictions);
  const dispatch = useDispatch();
  const [predictionList, setPredictionList] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const searchQueryRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNextData = async () => {
    if (predictionList.length < totalPredictions.length) {
      totalPredictions.length - predictionList.length >= 20
        ? setPredictionList([
            ...predictionList,
            ...totalPredictions.slice(
              predictionList.length,
              predictionList.length + 20
            ),
          ])
        : setPredictionList([
            ...predictionList,
            ...totalPredictions.slice(
              predictionList.length,
              totalPredictions.length
            ),
          ]);
    }
  };

  useEffect(() => {
    totalPredictions.length >= 20
      ? setPredictionList(totalPredictions.slice(0, 20))
      : setPredictionList(totalPredictions);
  }, [totalPredictions]);

  const handleSearchQueryChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      totalPredictions.length >= 20
        ? setPredictionList(totalPredictions.slice(0, 20))
        : setPredictionList(totalPredictions);
    } else {
      setPredictionList((prev) =>
        prev.filter((pred) =>
          pred.prediction.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="predictions">
      <div className="predictions-heading">
        <h4>Performance Predictions</h4>

        <div className="pred-search-container">
          <div
            className={`pred-search ${searchActive ? "open" : ""}`}
            onClick={() => setSearchActive(true)}
          >
            <FaSearch
              style={{ fontSize: 16 }}
              className="pred-searchIcon"
              onClick={() => setSearchActive(true)}
            />
            <input
              type="search"
              ref={searchQueryRef}
              value={searchQuery}
              onBlur={() => setSearchActive(false)}
              onChange={handleSearchQueryChange}
              placeholder="Search..."
            />
          </div>
          <button
            className="predictions-button"
            onClick={() => {
              dispatch(clearPredictionsDB({ email: user.email }));
            }}
          >
            <MdDeleteSweep /> Clear Predictions
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={predictionList.length}
        next={fetchNextData}
        hasMore={predictionList.length < totalPredictions.length}
        loader={
          <div style={{ textAlign: "center" }}>
            <PulseLoader color="#3cb19f" />
          </div>
        }
        endMessage={
          predictionList?.length > 0 ? (
            <div className="predictions-message">
              <h2>That’s All</h2>
            </div>
          ) : (
            <div className="predictions-message">
              <h2>No Predictions Yet!</h2>
            </div>
          )
        }
      >
        <div className="predictions-list">
          {predictionList?.map((prediction, index) => (
            <div className="predictions-list-item" key={index}>
              <img
                loading="lazy"
                src={`https://api.dicebear.com/7.x/adventurer-neutral/svg/seed=${prediction.UID}`}
                alt="proflie.img"
              />
              <div className="predictions-list-itemInfo">
                <h5 className="predictions-list-itemTitle">
                  {prediction.username}
                </h5>
                <p>{prediction.prediction}</p>
              </div>
              <div className="predictions-list-date-time">
                <small>{prediction.timestamp[0]}</small>
                <h5>{prediction.timestamp[1]}</h5>
              </div>
              <div
                className="predictions-list-itemDelete"
                onClick={() => {
                  dispatch(
                    removePredictionsDB({
                      prediction: prediction,
                      email: user.email,
                    })
                  );
                }}
              >
                <MdDeleteForever className="prediction-logo" />
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Predictions;
