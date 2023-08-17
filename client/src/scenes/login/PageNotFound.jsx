import maintain from "../../assets/PNF.png"
const PageNotFound = () => {
  return (
    <div className="h-[100vh] w-[100vw] bg-white flex flex-col justify-center items-center">
    
    <h1 className="text-[30vw]  sm:text-[100px] font-bold">404</h1>
    <h1>Page Not Found or Temporarily Down  </h1>
    <h1>May be under maintenance</h1>
    <img src={maintain} alt="" />
    
    
    </div>
  )
}

export default PageNotFound