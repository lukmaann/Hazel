import Post from "../models/postModel.js";
import User from "../models/userModel.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, caption, picturePath, location } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location,
      caption,
      profile: user.profile,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    // const { id } = req.params;
    const { id,userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    
    

   return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(404).send({ message: err.message });
    
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { comment,  postId } = req.body;
    const post=await Post.findById(postId)
    const updatePost=await Post.findByIdAndUpdate(postId,{$push:{comments:comment}})
    return res.status(201).send(updatePost.comments)

   
 
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


export const delpost=async(req,res)=>{
  try {
    const {id}=req.body
    const deletePost=await Post.findByIdAndDelete(id);
    return res.status(201).send("post deleted")
    
    
  } catch (error) {
    return res.status(404).json({error:error.message})
  }
}

export const getsinglepost=async(req,res)=>{
  
  try {
  const {postId}=req.params;
  const post=await Post.findById(postId)  ;
  return res.status(200).json(post)
    
  } catch (error) {
    return res.status(404).json({error:"cant get post"})
  }
}