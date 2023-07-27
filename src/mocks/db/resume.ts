import { Resume, ResumeSubmissionRequest } from "../../types/apiTypes";

const resumeUser: Resume["user"] = {
  id: 0,
  sso_id: "sample",
  first_name: "와플",
  last_name: "김",
  phone_number: "01012345678",
  email: "test@wafflestudio.com",
  department: "",
  college: "",
  university: "",
  github_email: "",
  slack_email: "",
  notion_email: "",
};

const resume: Resume[][] = [
  [
    {
      id: 0,
      user_id: 0,
      recruiting_id: 0,
      question_id: 1,
      created_at: "2021-08-04T00:00:00.000Z",
      updated_at: "2021-08-04T00:00:00.000Z",
      answer: "",
      user: resumeUser,
    },
    {
      id: 1,
      user_id: 0,
      recruiting_id: 0,
      question_id: 2,
      created_at: "2021-08-04T00:00:00.000Z",
      updated_at: "2021-08-04T00:00:00.000Z",
      answer: "",
      user: resumeUser,
    },
    {
      id: 2,
      user_id: 0,
      recruiting_id: 0,
      question_id: 3,
      created_at: "2021-08-04T00:00:00.000Z",
      updated_at: "2021-08-04T00:00:00.000Z",
      answer: "",
      user: resumeUser,
    },
  ],
  [
    {
      id: 0,
      user_id: 0,
      recruiting_id: 1,
      question_id: 1,
      created_at: "2021-08-04T00:00:00.000Z",
      updated_at: "2021-08-04T00:00:00.000Z",
      answer: "",
      user: resumeUser,
    },
    {
      id: 1,
      user_id: 0,
      recruiting_id: 1,
      question_id: 2,
      created_at: "2021-08-04T00:00:00.000Z",
      updated_at: "2021-08-04T00:00:00.000Z",
      answer: "",
      user: resumeUser,
    },
    {
      id: 2,
      user_id: 0,
      recruiting_id: 1,
      question_id: 3,
      created_at: "2021-08-04T00:00:00.000Z",
      updated_at: "2021-08-04T00:00:00.000Z",
      answer: "",
      user: resumeUser,
    },
  ],
];

export const getMyMockResume = (recruitingId: number) => resume[recruitingId];

export const setMyMockResume = (
  recruitingId: number,
  data: ResumeSubmissionRequest,
) => {
  resume[recruitingId] = resume[recruitingId].map((resume) => {
    if (data.map((data) => data.question_id).includes(resume.question_id)) {
      return {
        ...resume,
        answer:
          data.find((data) => data.question_id === resume.question_id)
            ?.answer ?? "",
      };
    } else {
      return resume;
    }
  });
};
