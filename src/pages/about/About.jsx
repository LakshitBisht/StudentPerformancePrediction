import "./About.css";
import Footer from "../../components/footer/Footer";
import SideNav from "../../components/sidenav/SideNav";
import { MdContactMail } from "react-icons/md";
import TypewriterComponent from "typewriter-effect";
import HeaderLogo from "../../assets/images/logo.png";
import AboutUsIllustration from "../../assets/illustrations/about-us.svg";
import ServicesIllustration from "../../assets/illustrations/services.svg";
import TeamIllustration from "../../assets/illustrations/team.svg";
import AuthIllustration from "../../assets/illustrations/auth.svg";
import PlayTrailerIllustration from "../../assets/illustrations/play-trailer.svg";
import RecommendationIllustration from "../../assets/illustrations/recommendation.svg";
import WatchListIllustration from "../../assets/illustrations/watch-list.svg";
import HistoryIllustration from "../../assets/illustrations/history.svg";
import ResponsiveIllustration from "../../assets/illustrations/responsive.svg";
import DeveloperIllustration from "../../assets/illustrations/developer.svg";
import MachineLearningIllustration from "../../assets/illustrations/machine-learning.svg";
import TeamMember1 from "../../assets/images/team-member1.gif";
import TeamMember2 from "../../assets/images/team-member2.gif";

export default function About() {
  return (
    <div className="about">
      <SideNav />
      <section className="v-center" id="about-header">
        <div className="section-container">
          <img src={HeaderLogo} alt=".PNG" />
          <TypewriterComponent
            options={{
              strings: ["Education Performance Prediction System"],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              wrapperClassName: "typewriter",
            }}
          />
        </div>
      </section>

      <section className="v-center" id="about-us">
        <img className="illustration" src={AboutUsIllustration} alt="" />
        <div className="section-container">
          <h1>About Us</h1>
          <p>
            Education performance prediction systems play a crucial role in
            academic institutions. By leveraging data analysis techniques, these
            systems forecast student outcomes, enabling early identification of
            at-risk students. Their purposes include facilitating early
            intervention for struggling students, guiding efficient resource
            allocation, improving student retention rates, and informing policy
            decisions. Overall, they contribute to a positive learning
            environment and educational success.
          </p>
        </div>
      </section>

      <section className="v-center" id="services">
        <h1>Services</h1>
        <img className="illustration" src={ServicesIllustration} alt="" />
        <div className="section-container">
          <div className="service">
            <img src={AuthIllustration} alt="" />
            <div className="service-details">
              <h3>Authentication</h3>
              <p>
                Process that makes creation and maintenance of your personal
                GoodWatch account a breeze.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={PlayTrailerIllustration} alt="" />
            <div className="service-details">
              <h3>Real Time Predictions</h3>
              <p>
                Real time predictions using our custom pretrained
                state-of-the-art machine learning models.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={RecommendationIllustration} alt="" />
            <div className="service-details">
              <h3>Recommendations</h3>
              <p>
                Robust recommendations based on predictions, to provide you with
                a diverse pallete to choose from.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={WatchListIllustration} alt="" />
            <div className="service-details">
              <h3>Customized Predictions</h3>
              <p>
                Customized preditions for each and every individual based on
                their personal data.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={HistoryIllustration} alt="" />
            <div className="service-details">
              <h3>Prediction History</h3>
              <p>
                History to help you track your past predictions, in case you
                want to revisit the predictions.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={ResponsiveIllustration} alt="" />
            <div className="service-details">
              <h3>Responsive</h3>
              <p>
                Multi device and cross-platflorm support, lets the site adapt to
                fit your devices’ needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="v-center" id="team">
        <h1>Meet Our Team</h1>
        <img className="illustration" src={TeamIllustration} alt="" />
        <div className="section-container">
          <div className="team-member">
            <img src={DeveloperIllustration} alt="" />
            <div className="team-member-details">
              <img className="team-member-profile" src={TeamMember1} alt="" />
              <h2>
                Lakshit Bisht{" "}
                <small style={{ opacity: 0.6 }}>
                  (Team Leader, Development)
                </small>
              </h2>
              <p>
                Proficient in languages C++, Python and Java, with in depth
                knowledge in fields like Database Management Systems and
                Operating Systems, Profound understanding of Machine Learning
                and web Development. Skilled in Competitive Programming, with
                astound knowledge of Data Structure and Algorithms.
              </p>
              <span>
                Contact :{" "}
                <a href="mailto:bishtlakshit555@gmail.com">
                  bishtlakshit555@gmail.com
                </a>
              </span>
            </div>
          </div>
          <div className="team-member">
            <img src={MachineLearningIllustration} alt="" />
            <div className="team-member-details">
              <img className="team-member-profile" src={TeamMember2} alt="" />
              <h2>
                Karuna Gulati{" "}
                <small style={{ opacity: 0.6 }}>
                  (Machine Learning, Research)
                </small>
              </h2>
              <p>
                Understanding in the fields of Machine Learning and Deep
                Learning. Experienced in languages like C++, Java and Python.
                Intermediate to advanced knowledge in building models and
                recommendation systems.
              </p>
              <span>
                Contact :{" "}
                <a href="mailto:karunagulati@gmail.com">
                  karunagulati@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="section-container v-center">
          <button
            className="contact-button"
            onClick={() =>
              (window.location.href = "mailto:bishtlakshit555@gmail.com")
            }
          >
            <MdContactMail style={{ fontSize: "inherit !important" }} /> Contact
            Us
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
