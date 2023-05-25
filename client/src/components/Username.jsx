import { Link } from "react-router-dom";
import Avatar from "../assets/profile.png";
import Styles from "../styles/username.module.css";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useState } from "react";


const d = new Date();
let year = d.getFullYear();


const Username = () => {

  const [ison,seton]=useState(false)
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold text-purple-500">Bourban!</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Explore more by connecting with Us
            </span>
          </div>
          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <img className={Styles.profile_img} src={Avatar} alt="Avatar" />
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input type="text" className={Styles.textbox} placeholder="Username" />
              <button className={Styles.btn} onMouseOver={()=>seton(true)} onMouseOut={()=>seton(false)} type="submit">Lets Go {ison && <ArrowOutwardIcon className="ml-4"/> } </button>
            </div>
            <div className="text-center py-10">
              <span>
                Not a Member?
                <Link to="/register" className=" text-red-500 font-medium">
                  register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">©{year} Lukn Developments || All right reserved</footer>
    </div>
  );
};

export default Username;
