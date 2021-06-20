import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectListSortBy,
  selectListSortTime,
  updateSortBy,
  updateSortTime,
} from "../../store/subredditSlice";
import "./Sort.css";

const sortTimeOptions = [
  ["hour", "Hour"],
  ["day", "Today"],
  ["week", "This Week"],
  ["month", "This Month"],
  ["year", "This Year"],
  ["all", "All Time"],
];

function Sort() {
  const sortBy = useSelector(selectListSortBy);
  const sortTime = useSelector(selectListSortTime);
  const dispatch = useDispatch();

  function handleSortSelection(e) {
    if (e && !e.currentTarget.classList.contains("sort-button__selected")) {
      let type = e.currentTarget.getAttribute("name") || "";
      if (["hot", "new", "top"].includes(type)) {
        dispatch(updateSortBy(type));
      } else {
        dispatch(updateSortTime(type));
      }
      if (!timeSelectBox.current.classList.contains("hidden")) {
        toggleTimeSelectBox();
      }
    }
  }

  const timeSelectBox = useRef(null);

  function toggleTimeSelectBox() {
    timeSelectBox.current.classList.toggle("hidden");
  }

  return (
    <div className="sort-box">
      <button
        className={
          "sort-button " + (sortBy === "hot" ? "sort-button__selected" : "")
        }
        name="hot"
        type="button"
        onClick={handleSortSelection}
      >
        <i className="material-icons start-icon">local_fire_department</i>
        <span>Hot</span>
      </button>
      <button
        className={
          "sort-button " + (sortBy === "new" ? "sort-button__selected" : "")
        }
        name="new"
        type="button"
        onClick={handleSortSelection}
      >
        <i className="material-icons start-icon">brightness_5</i>
        <span>New</span>
      </button>
      <button
        className={
          "sort-button " + (sortBy === "top" ? "sort-button__selected" : "")
        }
        name="top"
        type="button"
        onClick={handleSortSelection}
      >
        <i className="material-icons start-icon">leaderboard</i>
        <span>Top</span>
      </button>
      <div className="sort-time-wrapper">
        <button
          className={
            "sort-button " +
            (sortBy === "top" ? "sort-button__selected" : "hidden")
          }
          name="time"
          type="button"
          onClick={toggleTimeSelectBox}
        >
          <span>
            {(sortTimeOptions.find((time) => time[0] === sortTime) || [])[1]}
          </span>
          <i className="material-icons">expand_more</i>
        </button>
        <ul className="sort-time-options hidden" ref={timeSelectBox}>
          {sortTimeOptions.map((time) => (
            <li
              className={
                "sort-time-option " +
                (sortTime === time[0] ? "sort-time-option__selected" : "")
              }
              key={time[0]}
              name={time[0]}
              onClick={handleSortSelection}
            >
              {time[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sort;
