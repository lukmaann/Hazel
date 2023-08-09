/* eslint-disable react/prop-types */


const ViewPost=(props)=>{
    const {img}=props
    return <div className="w-[40vw] border-2 border-black h-[70vh]">
    <div className="w-[100%] mb-2 flex justify-around h-[80%] bg-black text-white"  >
    <div className="w-[45%] h-[100%] bg-yellow-300"></div>
    <div className="w-[45%] h-[100%] bg-slate-300 text-black">
    {img}
    

    </div>


    </div>
    <button className="p-2 border-2 rounded-lg m-2 border-black">Delete this post</button>
    <button className="p-2 border-2 rounded-lg m-2 border-black">Terminate User</button>


    </div>
}

export default ViewPost;