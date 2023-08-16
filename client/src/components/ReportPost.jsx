/* eslint-disable react/prop-types */
import { useFormik } from "formik"
import { reportValidation } from "../helper/validate";
import { postReport } from "../helper/helper";
import { toast } from "react-hot-toast";



const ReportPost=(props)=>{
    const {userId,postId,reportedById,openpopup}=props

    const formik=useFormik({
        initialValues:{
            reporttext:""
        },
        enableReinitialize:true,
        validate:reportValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async(value,{resetForm})=>{
            
          
            console.log(value.reporttext)
            const reportpromise=postReport({reportContent:value.reporttext,userId,postId,reportedById})

            toast.promise(reportpromise,{
                loading:"reporting",
                success:"report sent",
                error:"server error"
            })

            reportpromise.then(()=>{

                resetForm({values:""})
                openpopup(false)
                
                
            }).catch((data)=>{
                console.log(data);
            })
            
            
        }
    })
    return (
        <div className="">
        <h1>why are you reporting ?</h1>
        <h2 className="text-[10px] text-gray-400 my-1">False reports can affect your account</h2>
        <form onSubmit={formik.handleSubmit}>
        <textarea name="" id="" {...formik.getFieldProps("reporttext")}  className="h-[20vh] p-3 my-2 border w-[100%]" placeholder="Explain"></textarea>
            <button type="submit" className="p-2 px-5 block bg-red-500 text-white rounded-lg" >Report</button>
        </form>
            
        </div>
    )
}


export default ReportPost