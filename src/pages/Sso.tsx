import { useMutation, useQuery } from "react-query";
import { getRecruitingById } from "../apis/recruiting";
import { UserRegisterRequest } from "../types/apiTypes";
import { useState } from "react";
import { postUser } from "../apis/user";

export default function Sso() {
  const [registerInput, setRegisterInput] = useState<UserRegisterRequest>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const { data } = useQuery({
    queryFn: () => getRecruitingById(1),
  });
  const { mutate } = useMutation(
    (input: UserRegisterRequest) => postUser(input),
    {
      onSuccess: () => {
        console.log("성공");
      },
    },
  );

  if (!data) {
    return <div></div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          for (const key in registerInput) {
            if (registerInput[key as keyof typeof registerInput] === "") {
              alert("모든 항목을 입력해주세요");
              return;
            }
          }
          mutate(registerInput);
        }}
      >
        <input
          type="text"
          value={registerInput.first_name}
          onChange={(e) =>
            setRegisterInput({ ...registerInput, first_name: e.target.value })
          }
        />
        <input
          type="text"
          value={registerInput.last_name}
          onChange={(e) =>
            setRegisterInput({ ...registerInput, last_name: e.target.value })
          }
        />
        <input
          type="text"
          value={registerInput.email}
          onChange={(e) =>
            setRegisterInput({ ...registerInput, email: e.target.value })
          }
        />
        <input
          type="text"
          value={registerInput.phone_number}
          onChange={(e) =>
            setRegisterInput({ ...registerInput, phone_number: e.target.value })
          }
        />
        <input type="submit" />
      </form>
    </div>
  );
}
