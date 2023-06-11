import MenuItems from "../../components/widjets/menuItems"
import PopUp from "../../components/widjets/PopUp"
import { useModal } from "../../store/store"
import CreatePost from "../../components/CreatePost"
import { useEffect } from "react"
import { getFeedPosts } from "../../helper/helper"
import { usePostStore } from "../../store/store"



const ExplorePage=()=>{
  const feedPosts=usePostStore(state=>state.feedPosts)
  const setFeedPosts=usePostStore(state=>state.setFeedPosts)
  useEffect(()=>{
    const data=getFeedPosts();
    console.log(data);

  },[])
    const {modal,setModal}=useModal(state=>state)
    return <div>
    <h1 className="ml-[500]px">{feedPosts.length}</h1>
    {/* <MenuItems/> */}
    <PopUp openPopup={modal}
      setOpenPopup={setModal}
        title="Create Post"
        
      ><CreatePost/></PopUp>
    </div>
}



export default ExplorePage