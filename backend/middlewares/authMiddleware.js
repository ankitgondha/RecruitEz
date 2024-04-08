import JWT from "jsonwebtoken";
import { Candidate, Recruiter } from "../models/candidateModel.js";

export const requireSignInRecruiter = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.recruiter = decode;
    next();
  } catch (error) {
    // alert("Something went wrong");
    // console.log(error);
    // res.status(401).json({ error: "Unauthorized: Invalid token" });
    res.send(error);
  }
};

export const requireSignInCandidate = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.candidate = decode;
    next();
  } catch (error) {
    // alert("Something went wrong");
    // console.log(error);
    // res.status(401).json({ error: "Unauthorized: Invalid token" });
    res.send(error);
  }
};

// //admin acceess
// export const isRecruiter = async (req, res, next) => {
//   try {
//     const recruiter = await Recruiter.findById(req.recruiter._id);

//     if (!recruiter) {
//       return res.status(401).send({
//         success: false,
//         message: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     // console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middleware",
//     });
//   }
// };
