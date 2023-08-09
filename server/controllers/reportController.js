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

    return res.status(201).json({ message: "report posted" });
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};



export const getReports=async(req,res)=>{
  try {
    const reports=await Report.find();
    if(reports){
      res.status(200).json({reports})
    }


  } catch (error) {
    res.status(404).json({message:"cannot get reports"})
  }

}

export const deleteReport=async(req,res)=>{
  try {
    const {reportId}=req.params;
    await Report.findByIdAndDelete(reportId);
    const reports=await Report.find();
    res.status(200).json({reports})
    
  } catch (error) {
    res.status(500).json(error)
  }
}