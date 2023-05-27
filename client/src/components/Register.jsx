import { Toaster, toast } from "react-hot-toast"
const Register = () => {
const notify=()=>{
  return toast.success("done")
}

  return (
    <div>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
      <button className="p-10" onClick={notify}>Click</button>
    </div>
  )
}

export default Register