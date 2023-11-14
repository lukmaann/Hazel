import Style from "./booting.module.css";
import Img from "../../assets/favicon.png";
import { useEffect, useState } from "react";
import { LoadServer } from "../../helper/helper";
import { useNavigate } from "react-router-dom"; 
import {Toaster,toast} from "react-hot-toast"

const Booting = () => {
    const navigate=useNavigate()
  const [text, setText] = useState("Booting");

  useEffect(() => {
    const serverloader = LoadServer();

    serverloader.then(()=>{
        setText("Redirecting")

        setTimeout(()=>{
            navigate('/username')
        },2000)
    })

    
    setTimeout(() => {
      setText("Setting up the servers");
    }, 5000);

    setTimeout(() => {
      setText("Slow network detected");

    }, 8000);

    setTimeout(()=>{
        setText("server taking to long to respond");

    },11000)
  }, []);
  return (
    <div className={Style.main}>
    <Toaster position="bottom-right"/>
      <div className="flex flex-col items-center">
        <img src={Img} alt="" className={Style.img} />

        <h1 className={Style.txt}>{text}</h1>
      </div>
    </div>
  );
};

export default Booting;
