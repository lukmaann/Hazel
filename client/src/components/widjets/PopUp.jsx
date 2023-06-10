/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Dialog,DialogTitle,DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';



const PopUp=(props)=>{
    const {title,children,openPopup,setOpenPopup}=props;

    return <Dialog open={openPopup}>
        <DialogTitle >
        <div className="flex justify-between">
            {title}
            <button onClick={()=>setOpenPopup(false)}><CloseIcon/></button>
        </div>
        
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
    </Dialog>
}


export default PopUp;