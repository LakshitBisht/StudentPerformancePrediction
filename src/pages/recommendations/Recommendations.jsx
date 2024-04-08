import "./Recommendations.css";
import data from "../../assets/recommendations.json";
import CourseCards from "../../components/coursecard/CourseCards";

function Recommendations() {
  return (
    <div className="recommendations">
      <h1>Recommended Courses</h1>
      <div className="recommended-courses">
        {Object.keys(data).map((key, index) => (
          <CourseCards key={index} title={key} list={data[key]} />
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
