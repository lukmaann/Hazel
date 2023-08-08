import User from "../models/userModel.js";
/* READ */


export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } 
  catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id }) => {
        return _id ;
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404)
  }
};


export const getAllUsers=async (req,res)=>{
  try {
    const user=await User.find();
    res.status(200).json(user)
  } catch (error) {
    res.status(404)
  }
}

export const getSingleUser=async(req,res)=>{
  try {
    const {userId}=req.body;
    const user=await User.findById(userId)
    const {friends,lastName,firstName,mobile,address,savedPosts,...rest}=Object.assign({},user.toJSON())
    res.status(200).json(rest)
  } catch (error) {
    res.status(404).json({error})
  }
}