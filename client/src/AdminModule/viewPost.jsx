/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


const ViewPost=(props)=>{
    const {img,id,caption,likes,username}=props
    let likeCount = Object.keys(likes).length;
    return <div className="w-[40vw] border-2 border-black h-[70vh]">
    <div className="w-[100%] mb-2 flex justify-around h-[80%] bg-black text-white"  >
    <div className="w-[45%] h-[100%] ">
    <img className="w-[100%] h-[100%] object-scale-down" src={img}/>
    </div>
    <div className="w-[45%] h-[100%]  text-white">
    <div className="w-[100%] h-[50%]">
    <h1 className="bg-slate-500 text-center">About user</h1>
    <h1>Username:{username}</h1>
    <h1></h1>

    </div>
    <div className="w-[100%] h-[50%]">
    <h1 className="bg-slate-500 text-center">About Post</h1>

    </div>
    
    

    </div>


    </div>
    <button className="p-2 border-2 rounded-lg m-2 border-black">Delete this post</button>
    <button className="p-2 border-2 rounded-lg m-2 border-black">Terminate User</button>


    </div>
}

export default ViewPost;