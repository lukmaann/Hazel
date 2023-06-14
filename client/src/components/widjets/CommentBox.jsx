/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { usePostStore } from "../../store/store";
import Comments from "./comments";

import { addComment } from "../../helper/helper";
import { Toaster, toast } from "react-hot-toast";
const CommentBox=(props)=>{

    const {postId,comments}=props


    const updatePost=usePostStore(state=>state.updatePost)
    const formik=useFormik({
        initialValues:{
            comment:""
        },
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async(value)=>{
            value=await Object.assign(value,{postId:postId})
           const commentPromise= addComment(value);

           toast.promise(commentPromise,{
            success:"commented",
            loading:"commenting...",
            error:"cannot comment"
           })

           commentPromise.then(()=>{
            updatePost(value)
           })
        }
    })


    return <div className="w-[90%]">
    <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="top-center"
        reverseOrder={false}
      ></Toaster>
    <form action="" onSubmit={formik.handleSubmit} className="flex items-center">
    <textarea name="" id="" placeholder="Write a comment" {...formik.getFieldProps("comment")} className="h-[20%] border-2 border-b-4 focus:outline-none border-black border-r-0 rounded-sm w-[70%] p-1 ml-5"></textarea>
    <button type="submit" className="  border-2  border-l-0 rounded-r-md  bg-yellow-400 border-b-4 border-black py-4 w-[20%]">Add</button>

        
    </form>
    <div className=" rounded-sm p-5">
    <ul className="decoration-transparent border border-b-4 hover:border-b-black bg-white rounded-lg border-gray-500">
    {comments.slice(0).reverse().map((item,index)=>{
        if(index<=3){
            return <Comments key={index} comment={item}/>
        }
    })}

    </ul>
   
    
    </div>
  
        
    </div>
}


export default CommentBox