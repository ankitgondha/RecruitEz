import { Candidate, Recruiter } from "../models/candidateModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { email, password, answer, role } = req.body;
    //validations

    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    // if (!role) {
    //   return res.send({ message: "Role is Required" });
    // }
    //check user

    if (role == 1) {
      const existingRecruiter = await Recruiter.findOne({ email });
      if (existingRecruiter) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }

      const hashedPassword = await hashPassword(password);

      const recruiter = await new Recruiter({
        email,
        password: hashedPassword,
        answer,
        role,
      }).save();

      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        recruiter,
      });
    } else {
      const existingCandidate = await Candidate.findOne({ email });
      //exisiting user
      if (existingCandidate) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const candidate = await new Candidate({
        email,
        password: hashedPassword,
        answer,
        role,
      }).save();

      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        candidate,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const candidate = await Candidate.findOne({ email });

    if (candidate) {
      const match = await comparePassword(password, candidate.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign(
        { _id: candidate._id, role: 0 },
        process.env.JWT_SECRET_CANDIDATE,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).send({
        success: true,
        message: "login successfully",
        candidate: {
          _id: candidate._id,
          email: candidate.email,
          role: candidate.role,
        },
        token,
      });
    } else {
      const recruiter = await Recruiter.findOne({ email });

      if (!recruiter) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }

      const match = await comparePassword(password, recruiter.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }

      //token
      const token = await JWT.sign(
        { _id: recruiter._id, role: 1 },
        process.env.JWT_SECRET_RECRUITER,
        {
          expiresIn: "7d",
        }
      );
      res.status(200).send({
        success: true,
        message: "login successfully",
        recruiter: {
          _id: recruiter._id,
          email: recruiter.email,
          role: recruiter.role,
        },
        token,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  //   try {
  //     res.send("Protected Routes");
  //   } catch (error) {
  //     // console.log(error);
  //     res.send({ error });
  //   }

  res.send("Protected Routes");
};

export const updateRecruiterProfileController = async (req, res) => {
  try {
    const { name, gender, company, profileUrl } = req.body;
    const recruiter = await Recruiter.findById(req.recruiter._id);

    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.recruiter._id,
      {
        name: name || recruiter.name,
        gender: gender || recruiter.gender,
        company: company || recruiter.company,
        profileUrl: profileUrl || recruiter.profileUrl,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedRecruiter,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};
