/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Form.css";
import Loading from "../../components/loading/Loading";
import { useDispatch } from "react-redux";
import { addPredictionsDB } from "../../features/userSlice";

const Form = ({ user }) => {
  const dispatch = useDispatch();

  const [formActive, setformActive] = useState(true);
  const [result, setresult] = useState("");
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    UID: "",
    Name: "",
    Sex: "",
    Age: "",
    Marks10: "",
    Marks12: "",
    SGPA: "",
    CGPA: "",
    AMCAT: "",
    Skills: "",
    Attendance: "",
  });

  const getDateTime = () => {
    let currentdate = new Date();
    let date = currentdate.toDateString();
    let time = currentdate.toLocaleTimeString();
    return [date, time];
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let res = await fetch(import.meta.env.VITE_FLASK_BACKEND, {
        // mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          UID: formData.UID,
          Name: formData.Name,
          Sex: formData.Sex,
          Age: formData.Age,
          Marks10: formData.Marks10,
          Marks12: formData.Marks12,
          SGPA: formData.SGPA,
          CGPA: formData.CGPA,
          AMCAT: formData.AMCAT,
          Skills: formData.Skills,
          Attendance: formData.Attendance,
        }),
      });
      // Handle the response (success or error)
      await res.json().then((data) => {
        let predictionsMedia = {
          ...data,
          ...formData,
          timestamp: getDateTime(),
        };
        setresult(data);
        dispatch(
          addPredictionsDB({ media: predictionsMedia, email: user.email })
        );
        setformActive(false);
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setloading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : formActive ? (
    <form className="pred-form" onSubmit={handleSubmit}>
      <h2>Student Information Form</h2>
      <div className="form-container">
        <div className="input-div">
          <label htmlFor="UID">UID:</label>
          <input
            type="text"
            id="UID"
            name="UID"
            value={formData.UID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="Sex">Sex:</label>
          <select
            id="Sex"
            name="Sex"
            value={formData.Sex}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-div">
          <label htmlFor="Age">Age:</label>
          <input
            type="number"
            id="Age"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="Marks10">10th Marks (%):</label>
          <input
            type="number"
            id="Marks10"
            name="Marks10"
            value={formData.Marks10}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="Marks12">12th Marks (%):</label>
          <input
            type="number"
            id="Marks12"
            name="Marks12"
            value={formData.Marks12}
            onChange={handleChange}
            required
          />
        </div>
        {/* Semester Marks */}
        <div>
          <h3>Semester Marks</h3>
          <div className="input-div">
            <label htmlFor="SGPA">Enter SGPA (Comma Separated):</label>
            <input
              type="text"
              id="SGPA"
              name="SGPA"
              value={formData.SGPA}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <label htmlFor="Current CGPA">Current CGPA:</label>
            <input
              type="number"
              id="CGPA"
              name="CGPA"
              value={formData.CGPA}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="input-div">
          <label htmlFor="AMCAT">AMCAT Score:</label>
          <input
            type="number"
            id="AMCAT"
            name="AMCAT"
            value={formData.AMCAT}
            onChange={handleChange}
          />
        </div>
        {/* Skill Inputs */}
        <div>
          <h3>Skills</h3>
          <div className="input-div">
            <label htmlFor="Skills">Enter Skills(Comma Separated):</label>
            <input
              type="text"
              id="Skills"
              name="Skills"
              value={formData.Skills}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-div">
          <label htmlFor="Attendance">Attendance (%):</label>
          <input
            type="number"
            id="Attendance"
            name="Attendance"
            value={formData.Attendance}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  ) : (
    <div className="pred-result">
      <h1>Prediction Result</h1>
      <p>
        Hi, <span>{result.username}</span>, I think you can study{" "}
        <span>{result.recommended_course}</span> course and you are{" "}
        <span>{result.user_performance}</span> in performance. Also, you{" "}
        <span>{result.placement_status}</span> get placed easily.
      </p>
      <button
        onClick={() => {
          setformActive((prev) => !prev);
          setFormData({
            UID: "",
            Name: "",
            Sex: "",
            Age: "",
            Marks10: "",
            Marks12: "",
            SGPA: "",
            CGPA: "",
            AMCAT: "",
            Skills: "",
            Attendance: "",
          });
        }}
      >
        Predict Again
      </button>
    </div>
  );
};

export default Form;
