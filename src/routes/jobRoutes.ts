import express from "express";
import {
  closeJob,
  createDraftJob,
  deleteJobById,
  getActiveJobs,
  getClosedJobs,
  getDraftJobs,
  getFilteredJobs,
  getJobStates,
  postJob,
} from "../controller/jobController";

export const jobRouter = express.Router();

jobRouter.route("/").post(postJob);

jobRouter.route("/active-jobs").get(getActiveJobs);

jobRouter.route("/").get(getFilteredJobs);

jobRouter.route("/add-draft").post(createDraftJob);

jobRouter.route("/closed-jobs").get(getClosedJobs);

jobRouter.route("/draft-jobs").get(getDraftJobs);

jobRouter.route("/job-states").get(getJobStates);

jobRouter.route("/:id").delete(deleteJobById);

jobRouter.route("/:id").patch(closeJob);