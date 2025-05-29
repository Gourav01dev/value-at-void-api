import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobProfile: {
        type: String,
        required: [true, 'Job profile is required'],
    },
    salary: {
        type: String,
        required: [true, 'Salary is required'],
    },
    experience: {
        type: String,
        required: [true, 'Experience is required'],
    },
    jobType: {
        type: String,
        required: [true, 'Job type is required'],
    },
    jobDescription:{
        type: String,
        required: [true, 'Job description is required'],
    },
    status: {
        type: String,
        required: [true, 'Job status is required']
    }
}, {
    timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
