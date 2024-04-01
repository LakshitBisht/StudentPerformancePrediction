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
import { useEffect, useState } from "react";

function Predictions({ user }) {
  const totalPredictions = useSelector(selectPredictions);
  const dispatch = useDispatch();
  const [predictionList, setPredictionList] = useState([]);

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

  return (
    <div className="predictions">
      <div className="predictions-heading">
        <h4>Performance Predictions</h4>
        <button
          className="predictions-button"
          onClick={() => {
            dispatch(clearPredictionsDB({ email: user.email }));
          }}
        >
          <MdDeleteSweep /> Clear Predictions
        </button>
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
              <h2>That's All</h2>
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
              <img loading="lazy" src={user.photoURL} alt="proflie.img" />
              <div className="predictions-list-itemInfo">
                <h5 className="predictions-list-itemTitle">
                  {prediction.username}
                </h5>
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
                <MdDeleteForever />
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Predictions;
