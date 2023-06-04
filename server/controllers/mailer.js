import mailgen from "mailgen"
import nodemailer from "nodemailer"

const nodeConfig={
    // host: "smtp.ethereal.email",
    // port: 587,
    service:"gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  }

  let  transporter=nodemailer.createTransport(nodeConfig);

  let mailGenerator= new mailgen({
    theme:"default",
    product:{
        name:"Bourbon",
        link:"https://lukmaanbhai.com/"
    }
  })


  export const registerMail=async (req,res)=>{

    const {username ,userEmail}=req.body
    const email={
        body:{
            name:username,
            intro:"welcome to bourbon",
            outro:"thanks for joining us"
        }
    }
    let emailBody=mailGenerator.generate(email);
    let message={
        from:process.env.EMAIL,
        to:userEmail,
        subject:"welcome",
        html:emailBody
    }

    transporter.sendMail(message).then(()=>{
        res.status(200).send({msg:"Check your email please"})
    }).catch((error)=>{
        return res.status(500).send({error})
    })





  }