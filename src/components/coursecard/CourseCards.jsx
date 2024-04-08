/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types

import "./CourseCards.css";

export default function CourseCards({ title, list }) {
  return (
    <div className="course-cards">
      <h2>{title}</h2>
      <div className="card-list">
        {list.map((course) => (
          <div
            className="course-card"
            key={course.title + course.description.length}
          >
            <img src={course.image} alt=".jpeg" />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
