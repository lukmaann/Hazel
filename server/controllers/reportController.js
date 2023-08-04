import Report from "../models/reportModel.js";

export const createReport = async (req, res) => {
  try {
    const { userId, postId, reportedById, reportContent } = req.body;
    const newReport = new Report({
      userId,
      postId,
      reportedById,
      reportContent,
    });

    
    

    await newReport.save();

    return res.status(201).json({message:"report posted"})
   

  } catch (error) {
    return res.status(409).json({ message: error });
  }
};
