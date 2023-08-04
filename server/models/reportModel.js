import mongoose from "mongoose";


const ReportSchema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      postId:{
        type:String,
        required:true
      },
      reportedById:{
        type:String
      },
      reportContent:{
        type:String
      }
    },
    { timestamps: true }
  );
  
  const Report = mongoose.model("Report", ReportSchema);
  
  export default Report;