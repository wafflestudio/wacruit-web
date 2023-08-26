import { QueryClient } from "@tanstack/react-query";
import { getQuestions } from "../../apis/resume";
import { myResumeQuery } from "../Dashboard/DashboardLoader";
import {
  Resume,
  ResumeQuestion,
  ResumeSubmissionCreate,
  UserInvitationEmails,
  UserUpdate,
} from "../../types/apiTypes";
import { LoaderReturnType } from "../../types/commonTypes";
import { getInvitation, getUser } from "../../apis/user";

export const resumeQuestionQuery = (id: number) => ({
  queryKey: ["resume", "question", id],
  queryFn: () => getQuestions(id),
  staleTime: Infinity,
});

export const userInformationQuery = () => ({
  queryKey: ["user", "information"],
  queryFn: () => getUser(),
  staleTime: Infinity,
});

export const userInvitationQuery = () => ({
  queryKey: ["user", "invitation"],
  queryFn: () => getInvitation(),
  staleTime: Infinity,
});

export const resumeLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Record<string, unknown> }) => {
    const resumeQuery = myResumeQuery(Number(params.recruit_id));
    const questionQuery = resumeQuestionQuery(Number(params.recruit_id));
    const cachedResume = queryClient.getQueryData<{ items: Resume[] }>(
      resumeQuery.queryKey,
    );
    const cachedQuestion = queryClient.getQueryData<{
      items: ResumeQuestion[];
    }>(questionQuery.queryKey);
    const resume =
      cachedResume !== undefined
        ? cachedResume
        : await queryClient.fetchQuery(resumeQuery);
    const question =
      cachedQuestion !== undefined
        ? cachedQuestion
        : await queryClient.fetchQuery(questionQuery);

    const initialInputs: (ResumeSubmissionCreate & {
      question_num: number;
      question_content: string;
      content_limit: number;
    })[] = [];
    question.items.forEach((item, index) => {
      const resumeIndex = resume.items.findIndex(
        (resumeItem) => resumeItem.question_id === item.question_num,
      );
      initialInputs.push({
        question_num: item.question_num,
        question_content: item.content,
        content_limit: item.content_limit,
        question_id: item.question_num,
        answer: resumeIndex !== -1 ? resume.items[resumeIndex].answer : "",
      });
    });

    // user
    const userQuery = userInformationQuery();
    const user = await queryClient.fetchQuery(userQuery);
    const invitationQuery = userInvitationQuery();
    const invitation = await queryClient.fetchQuery(invitationQuery);

    const userInputs: UserUpdate & UserInvitationEmails = {
      university: user.university,
      college: user.college,
      department: user.department,
      github_email: invitation.github_email,
      slack_email: invitation.slack_email,
      notion_email: invitation.notion_email,
    };

    return {
      initialInputs,
      userInputs,
    };
  };

export type ResumeLoaderReturnType = LoaderReturnType<typeof resumeLoader>;
