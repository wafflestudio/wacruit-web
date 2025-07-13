import { useState } from "react";

export const QuestionAccordian = ({
  questions,
}: {
  questions: { id: number; question: string; answer: string }[];
}) => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggleOpen = (id: number) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div>
      {questions.map(({ id, question, answer }) => (
        <div key={id}>
          <button onClick={() => toggleOpen(id)}>{question}</button>
          {openIds.has(id) && <div>{answer}</div>}
        </div>
      ))}
    </div>
  );
};
