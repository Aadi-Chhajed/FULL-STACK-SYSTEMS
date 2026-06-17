require("dotenv").config();

const express = require("express");
const multer = require("multer");

const { decodeQR } = require("./qr");
const {
  extractRollNumber,
  isRegistered
} = require("./parser");

const {
  markPresent,
  getStats
} = require("./attendance");

const app = express();

const upload = multer({
  dest: "uploads/"
});

app.use(express.static("public"));

app.post(
  "/scan",
  upload.single("image"),
  async (req, res) => {

    try {

      const qrString =
        await decodeQR(req.file.path);

      const rollNumber =
        extractRollNumber(qrString);

      if (!rollNumber) {
        return res.json({
          success:false,
          message:"No roll number found"
        });
      }

      if (!isRegistered(rollNumber)) {
        return res.json({
          success:false,
          message:"Roll number out of range"
        });
      }

      const result =
        markPresent(rollNumber);

      if (!result.success) {
        return res.json({
          success:false,
          message:"Already marked",
          timestamp:result.timestamp
        });
      }

      res.json({
        success:true,
        rollNumber,
        timestamp:result.timestamp
      });

    } catch(err) {

      res.json({
        success:false,
        message:err.message
      });

    }

  }
);

app.get("/report",(req,res)=>{
  res.json(getStats());
});

app.listen(3000,()=>{
  console.log(
    "Running on http://localhost:3000"
  );
});