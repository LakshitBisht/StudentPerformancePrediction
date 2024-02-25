import HashLoader from "react-spinners/HashLoader";
import "./Loading.css";

function Loading({loading=true}) {
  return (
    <div className="loading">
        <HashLoader size={50} color={'#3cb19f'} loading={loading}/>
	</div>
  )
}
export default Loading;