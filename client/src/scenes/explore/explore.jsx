import MenuItems from "../../components/widjets/menuItems"
import PopUp from "../../components/widjets/PopUp"
import { useModal } from "../../store/store"
import CreatePost from "../../components/CreatePost"
import { usePostStore } from "../../store/store"
import FeedPosts from "../../components/widjets/FeedPosts"

const ExplorePage=()=>{
  const feedPosts=usePostStore(state=>state.feedPosts)
  console.log(feedPosts.length);
  
  
    const {modal,setModal}=useModal(state=>state)
    return <div>
    <MenuItems/>
    <div className="ml-[20%] w-[60%] min-h-max">
      <FeedPosts/>
    </div>
    <PopUp openPopup={modal}
      setOpenPopup={setModal}
        title="Create Post"
        
      ><CreatePost/></PopUp>
    </div>
}



export default ExplorePage