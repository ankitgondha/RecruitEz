import express from express;

const router = express.Router();

import {
    requireSignInRecruiter,
    requireSignInCandidate,
  } from "../middlewares/authMiddleware.js";

import { Candidate, Recruiter } from "../models/candidateModel";

router.get("/:userId", async(req, res)=>{
    try {
        
        const role = window.sessionStorage.getItem("role");

        console.log("hi from userInfo");
        console.log(typeof role);
        
        if(role==0){
            const candidate = await Candidate.findById(req.params.userId);

            if(!candidate){
                return res.status(404).send("Candidate Not found");
            }

            res.send(candidate);
        }
        else
        {
            const recruiter = await Recruiter.findById(req.params.userId);

            if(!recruiter){
                return res.status(404).send("Recruiter Not found");
            }

            res.send(recruiter);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

