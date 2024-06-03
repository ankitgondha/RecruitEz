import express from "express";
import multer from "multer";
const router = express.Router();
import axios from "axios";

import { Candidate, Recruiter } from "../models/candidateModel.js";
import ProfileImg from "../models/ProfileImg.js";
import MyResumeSchema from "../models/ResumePdf.js";
// import MyResumeSchema from "./../models/ResumePdf";

function flattenJSONArray(jsonArray) {
  let flattenedArray = [];

  // Iterate through each element of the JSON array
  jsonArray.forEach((element) => {
    // Check if the element is an array
    if (Array.isArray(element)) {
      // If it's an array, iterate through its elements
      element.forEach((innerElement) => {
        // Check if the inner element is an object
        if (typeof innerElement === "object" && innerElement !== null) {
          // If it's an object, convert it to a string and push to the flattened array
          flattenedArray.push(JSON.stringify(innerElement));
        } else {
          // If it's not an object, simply push it to the flattened array
          flattenedArray.push(innerElement);
        }
      });
    } else {
      // If the element is not an array, simply push it to the flattened array
      flattenedArray.push(element);
    }
  });

  return flattenedArray;
}

// POST - Create a new user
router.post("/", async (req, res) => {
  try {
    const user = new Candidate(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all users
router.get("/all", async (req, res) => {
  try {
    const users = await Candidate.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a user by ID

router.get("/userInfo/:userId/:role", async (req, res) => {
  try {
    console.log("boy is", req.body);
    console.log(req.params);
    console.log(req.body.userId);
    console.log(req.body.role);
    // const file = req.file;

    // console.log(file);
    // console.log(req.headers);

    // const role = req.headers["User-Role"];
    // console.log(role);
    // console.log(typeof role);

    if (req.params.role == "0") {
      const candidate = await Candidate.findById(req.params.userId);

      if (!candidate) {
        return res.status(404).send();
      }

      res.send(candidate);
    } else {
      const recruiter = await Recruiter.findById(req.params.userId);

      if (!recruiter) {
        return res.status(404).send();
      }

      res.send(recruiter);
    }

    res.send(req.params);
  } catch (error) {
    res.status(500).send();
  }
});

const storage = multer.memoryStorage(); // Store file data in memory
const upload = multer({ storage: storage });

// PUT - Update a user by ID

router.put("/update/:userId/", async (req, res) => {
  if (req.body.role == "1") {
    // console.log("Recruiter");

    try {
      const recruiter = await Recruiter.findById(req.params.userId);
      console.log(recruiter);

      const updatedRecruiter = await Recruiter.findByIdAndUpdate(
        req.params.userId,
        {
          name: req.body.name || recruiter.name,
          company: req.body.company || recruiter.company,
        },
        {
          new: true,
        }
      );

      await updatedRecruiter.save();

      res.status(200).send({
        success: true,
        message: "Profile Updated Successfully",
        updatedRecruiter,
      });

      // let profileImg = await ProfileImg.findOne({ userId: req.params.userId });
      // console.log("profile Image is", profileImg);

      // if (!profileImg) {
      //   const newFile = new ProfileImg({
      //     userId: req.params.userId,
      //     contentType: file.mimetype,
      //     data: file.buffer,
      //   });

      //   await newFile.save();

      //   console.log(newFile);
      //   res.status(200).send({
      //     success: true,
      //     message: "Profile Updated Successfully",
      //     updatedRecruiter,
      //   });

      //   // res.send(profileImg);
      //   // console.log(newFile);
      // }
      // else
      // {
      //   const updateImage = await ProfileImg.findOneAndUpdate(
      //     { userId: req.params.userId },

      //     {
      //       contentType: file.mimetype || profileImg.mimetype,
      //       data: file.buffer || profileImg.buffer,
      //     },
      //     {
      //       new: true,
      //     }
      //   );

      //   // Save the updated document
      //   // await updateImage.save();
      //   console.log(updateImage);
      //   console.log("saved");

      //   });
      // }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error While Updating Recruiter profile",
        error,
      });
    }
  } else {
    // console.log("Candidate");

    try {
      const candidate = await Candidate.findById(req.params.userId);
      console.log(candidate);

      const updatedCandidate = await Candidate.findByIdAndUpdate(
        req.params.userId,
        {
          name: req.body.name || candidate.name,
          // company: req.body.company || candidate.company,
        },
        {
          new: true,
        }
      );

      let myResume = await MyResumeSchema.findOne({
        userId: req.params.userId,
      });
      console.log("profile Image is", myResume);

      // console.log("prod::",profileImg);

      // If profileImg is null (i.e., no document found), create a new one
      if (!myResume) {
        // Handle case where user ID doesn't exist
        // console.log("no find");
        const newFile = new MyResumeSchema({
          userId: req.params.userId,
          contentType: file.mimetype,
          data: file.buffer,
        });

        await newFile.save();

        console.log(newFile);
        res.status(200).send({
          success: true,
          message: "Profile Updated Successfully",
          updatedCandidate,
        });

        // res.send(profileImg);
        // console.log(newFile);
      } else {
        // Update the existing document with the new data

        const updateResume = await MyResumeSchema.findOneAndUpdate(
          { userId: req.params.userId },

          {
            contentType: file.mimetype || myResume.mimetype,
            data: file.buffer || myResume.buffer,
          },
          {
            new: true,
          }
        );

        // Save the updated document
        // await updateImage.save();
        console.log(updateImage);
        console.log("saved");

        res.status(200).send({
          success: true,
          message: "Profile Updated Successfully",
          updateResume,
        });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error While Updating Recruiter profile",
        error,
      });
    }
  }

  // if (req.body.role == "0") {
  //   try {
  //     const user = await Candidate.findByIdAndUpdate(
  //       req.params.userId,
  //       { companyName, name }, // Specify the fields to update
  //       { new: true, runValidators: true }
  //     );
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // } else {
  //   try {
  //     const { company, name } = req.body;
  //     const user = await Candidate.findByIdAndUpdate(
  //       req.params.userId,
  //       { company, name }, // Specify the fields to update
  //       { new: true, runValidators: true }
  //     );
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // }
});

// DELETE - Delete a user by ID
router.delete("/:userId", async (req, res) => {
  try {
    const user = await Candidate.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/profileimg", async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query parameters
    console.log("userId:", userId);

    const file = await ProfileImg.findOne({ userId: userId });
    if (!file) {
      return res.status(404).send("File not found");
    }

    res.set("Content-Type", file.contentType); // Set content type based on file
    res.send(file.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post(
  "/updateCandidate/:userId/",
  upload.single("file"),
  async (req, res) => {
    const file = req.file;

    try {
      const candidate = await Candidate.findById(req.params.userId);
      console.log(candidate);
      if (!candidate) {
        return res
          .status(404)
          .json({ success: false, message: "Candidate not found" });
      }

      const updatedCandidate = await Candidate.findByIdAndUpdate(
        req.params.userId,
        {
          name: req.body.name || candidate.name,
        },
        {
          new: true,
        }
      );

      let resume = await MyResumeSchema.findOne({
        userId: req.params.userId,
      });

      console.log("profile Image is", resume);

      if (!resume) {
        const newFile = new MyResumeSchema({
          userId: req.params.userId,
          contentType: file.mimetype,
          data: file.buffer,
        });

        await newFile.save();
        resume = newFile;

        const newdata = {
          data: file.buffer.toString("base64"),
          id: req.params.userId,
          job_description: "hi",
        };

        // const flaskResponse = await axios.post(
        //   "http://localhost:9999/predict",
        //   newdata
        // );

        // console.log("Flask response:", flaskResponse.data);

        console.log(newFile);
        res.status(200).send({
          success: true,
          message: "Profile Updated Successfully",
          updatedCandidate,
          resume,
        });

        // res.send(profileImg);
        // console.log(newFile);
      } else {
        const updateResume = await MyResumeSchema.findOneAndUpdate(
          { userId: req.params.userId },

          {
            contentType: file.mimetype || resume.mimetype,
            data: file.buffer || resume.buffer,
          },
          {
            new: true,
          }
        );

        console.log(updateResume);
        console.log("saved");

        const newdata = {
          data: file.buffer.toString("base64"),
          id: req.params.userId,
          job_description: "hi",
        };

        console.log("new Data is", newdata);

        // const flaskResponse = await axios.post(
        //   "http://localhost:9999/predict",
        //   newdata
        // );

        // console.log("Flask response:", flaskResponse.data);

        res.status(200).send({
          success: true,
          message: "Profile Updated Successfully",
          updateResume,
        });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error While Updating Recruiter profile",
        error,
      });
    }
  }
);

router.post("/updateRecruiter/:userId", async (req, res) => {
  try {
    const { name, company, role } = req.body;

    const recruiter = await Recruiter.findById(req.params.userId);
    if (!recruiter) {
      return res.status(404).json({ success: false, message: "Recruiter not found" });
    }

    recruiter.name = name || recruiter.name;
    recruiter.company = company || recruiter.company;
    recruiter.role = role || recruiter.role;

    const updatedRecruiter = await recruiter.save();

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedRecruiter,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send({ success: false, message: "Error updating profile" });
  }
});


export default router;
