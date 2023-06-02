import "./Loader.css";
import loaderGif from '../../assets/loader.svg'

export const Loader = () => {
  return (
    <div className="loader-wrapper flex-center">
      <img src={loaderGif} className="loader"></img>;
    </div>
  )
}