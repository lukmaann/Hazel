import { useFormik } from "formik"
import { reportValidation } from "../helper/validate";



const ReportPost=()=>{

    const formik=useFormik({
        initialValues:{
            reporttext:""
        },
        enableReinitialize:true,
        validate:reportValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async(value,{resetForm})=>{
            
            console.log(value);
            resetForm({values:""})
            
            
        }
    })
    return (
        <div className="">
        <h1>why are you reporting ?</h1>
        <h2 className="text-[10px] text-gray-400 my-1">False reports can effect your account</h2>
        <form onSubmit={formik.handleSubmit}>
        <textarea name="" id="" {...formik.getFieldProps("reporttext")} cols="30" rows="10" className="h-[20vh] p-3 my-2 border" placeholder="Explain"></textarea>
            <button type="submit" className="p-2 px-5 block bg-red-500 text-white rounded-lg">Report</button>
        </form>
            
        </div>
    )
}


export default ReportPost