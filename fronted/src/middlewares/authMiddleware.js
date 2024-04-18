import JWT from "jsonwebtoken";
import { Candidate, Recruiter } from "../models/candidateModel.js";

export const requireSignInRecruiter = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_RECRUITER
    );

    console.log(req);
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
      process.env.JWT_SECRET_CANDIDATE
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

export const isRecruiter = async (req, res, next) => {
  try {
    const token = (req.body.token || req.query.token)
    const decode = JWT.verify(token, process.env.JWT_SECRET_RECRUITER);
    console.log("token info is", decode);
    req.body.tokenDetails = decode;
    const role = decode.role;
    console.log(">>");
    console.log(role);
    console.log(">>");

    if (role === 1) {
      console.log("going to next");
      next();
    } else {
      console.log("giving error");
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access, cant access this",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in recruiter middleware",
    });
  }
};

export const isCandidate = async (req, res, next) => {
  try {
    // console.log("token for candidate is", req)
    // console.log("token for candidate is 2", req.query)
    const token = (req.body.token || req.query.token)
    const decode = JWT.verify(token, process.env.JWT_SECRET_CANDIDATE);
    console.log("token info is", decode);
    req.body.tokenDetails = decode;
    // console.log("<<");
    // console.log(req.body);
    // console.log(">>");

    const role = req.body.tokenDetails.role;
    console.log(">>");
    console.log(role);
    console.log(">>");

    if (role === 0) {
      console.log("going to next");
      next();
    } else {
      console.log("giving error");
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access, cant access this",
      });
    }

    // console.log("req hit");
    // console.log(req.candidate._id);
    // console.log(res.body.tokenDetails);
    // const candidate = await Candidate.findById(req.candidate._id);
    // if (!candidate) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "UnAuthorized Access, cant access this",
    //   });
    // } else {
    // next();
    // }
  } catch (error) {
    console.log("giving error 2");

    res.status(401).send({
      success: false,
      error,
      message: "Error in candidate middleware",
    });
  }
};
