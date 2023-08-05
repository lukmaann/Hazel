import { useFormik } from "formik"
const AdminLogin=()=>{

    const formik=useFormik({
        initialValues:{
            password:""
        },
        validateOnChange:false,
        validateOnBlur:false,
        onSubmit: async(value)=>{

            const {password}=value;
            console.log(password);

            

        }
      
    })
    return <div className="flex justify-center items-center h-screen">
        <form action="" onSubmit={formik.handleSubmit}>
        
        <div>
        <h1 className='text-3xl font-semibold  mb-2'>Welcome Admin</h1>
        </div>
      

        <input {...formik.getFieldProps('password')} type="text" placeholder="Enter Admin Key" className="border-2 border-black p-2 " autoComplete="OFF" />
        <button type="submit" className="p-2 border-2 border-black border-l-0 bg-yellow-300">Go</button>

        </form>
    </div>
}



export default AdminLogin