
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/loading/Loading";
import "./HomeScreen.css";


export default function HomeScreen() {

  const user = useSelector(selectUser);

  
  return (
    <div className="homeScreen">
      {!user.displayName ? (
        <Loading />
      ) : (
          <>
            <Navbar />
            <Footer />
          </>
        )
      }
    </div>
  );
}
