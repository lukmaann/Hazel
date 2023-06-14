/* eslint-disable react/prop-types */
import { useState } from "react"
import Heart from "react-heart"



const Comments=(props)=>{
    const {comment}=props

    const [liked,setLiked]=useState(false)
    return <div className="p-2 flex justify-between m-2 ">
        <h1>{comment}</h1>
        <Heart isActive={liked} onClick={()=>setLiked(!liked)} className="w-3"/>
    </div>
}

export default Comments