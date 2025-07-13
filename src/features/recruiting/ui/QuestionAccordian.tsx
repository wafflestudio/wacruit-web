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
    <div className="space-y-4">
      {questions.map(({ id, question, answer }) => (
        <div key={id} className="border rounded-xl p-4 shadow">
          <button
            className="w-full text-left font-semibold text-lg"
            onClick={() => toggleOpen(id)}
          >
            {question}
          </button>
          {openIds.has(id) && (
            <div className="mt-2 text-gray-700 text-base">{answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};
