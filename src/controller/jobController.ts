import { NextFunction, Request, Response } from "express";
import Job from "../models/jobModel";
import { JobStatus } from "../constants/enum";
import { HttpException } from "../exception/http-exception";
import { ApiResponseDto } from "../dto/api-response-dto";

export const postJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { jobProfile, jobDescription, salary, experience, jobType } = req.body;

  if (!jobProfile || !jobDescription || !salary || !experience || !jobType) {
    throw new HttpException("All fields are required.", 400, "Bad Request");
  }

  try {
    const job = await Job.create({
      jobProfile,
      jobDescription,
      salary,
      experience,
      jobType,
      status: JobStatus.Active,
    });

    res.status(201).json(new ApiResponseDto("Job created successfully.", job));
  } catch (error) {
    next(error);
  }
};

export const getActiveJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobs = await Job.find();
      const activeJobs = jobs.filter(
      (job: any) => job?.status === JobStatus.Active
    );
    res
      .status(200)
      .json(
        new ApiResponseDto(
          activeJobs.length ? "Get Job data successfully." : "No job data found.",
          activeJobs
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getFilteredJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jobProfile, jobType, experience, status } = req.query;
    const filter: any = {};

    if (jobProfile) {
      filter.jobProfile = { $regex: new RegExp(jobProfile as string, "i") };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (experience) {
      filter.experience = `${experience} years`;
    }

    if (status) {
      filter.status = status
    }

    const jobs = await Job.find(filter);
    res
      .status(200)
      .json(
        new ApiResponseDto(
          jobs.length
            ? "Get filtered Job data successfully."
            : "No job data found.",
          jobs
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getJobStates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const activeJobCount = await Job.countDocuments({ status: "active" });
    const jobStates = {
      activeJobs: activeJobCount,
      applicationRecieved: 665,
      hired: 11,
    };

    res.json({ ...jobStates });

    res.status(200).json(new ApiResponseDto("Job states data", jobStates));
  } catch (error) {
    next(error);
  }
};

export const getClosedJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobs = await Job.find();

    const closedJobs = jobs.filter(
      (job: any) => job?.status === JobStatus.CLOSE
    );
    res
      .status(200)
      .json(
        new ApiResponseDto(
          closedJobs.length
            ? "Get Closed Job data successfully."
            : "No job data found.",
          closedJobs
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getDraftJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobs = await Job.find();
    if (!jobs.length) {
      res.status(200).send({ message: "No jobs found." });
      return;
    }
    const draftJobs = jobs.filter((job: any) => job.status === JobStatus.DRAFT);
    res
      .status(200)
      .json(
        new ApiResponseDto(
          draftJobs.length
            ? "Get draft Jobs data successfully."
            : "No job data found.",
          draftJobs
        )
      );
  } catch (error) {
    next(error);
  }
};

export const createDraftJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { jobProfile, jobDescription, salary, experience, jobType } = req.body;

  try {
    const job = await Job.create({
      jobProfile: jobProfile ? jobProfile : "",
      jobDescription: jobDescription ? jobDescription : "",
      salary: salary ? salary : "",
      experience: experience ? experience : "",
      jobType: jobType ? jobType : "",
      status: "draft",
    });

    res
      .status(201)
      .json(new ApiResponseDto("Added Job as Draft successfully.", job));
  } catch (error) {
    next(error);
  }
};

export const closeJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { status: JobStatus.CLOSE },
      { new: true }
    );

    if (!updatedJob) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res
      .status(200)
      .json(new ApiResponseDto("Job closed successfully.", updatedJob));
  } catch (error) {
    next(error);
  }
};

export const deleteJobById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};