import { useMutation, useQuery } from "react-query";
import { getRecruitingById } from "../apis/recruiting";
import { UserRegisterRequest } from "../types/apiTypes";
import { useEffect, useState } from "react";
import { postUser } from "../apis/user";
import { checkAuth, saveSsoToken } from "../apis/auth";
import { useNavigate, useParams } from "react-router-dom";

const getRedirectPath = (to: string) => {
  if (to === "home") {
    return "/";
  } else {
    return `/recruiting/${to}`;
  }
};

export default function Sso() {
  const navigate = useNavigate();
  const params = useParams();
  const [needRegister, setNeedRegister] = useState(false);
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
        navigate(getRedirectPath(params.recruit_id ?? "home"));
      },
    },
  );

  useEffect(() => {
    saveSsoToken();
    checkAuth().then((authState) => {
      if (authState === "invalid") {
        alert("다시 로그인해주세요");
        navigate("/");
        return;
      }
      if (authState === "need_register") {
        setNeedRegister(true);
        return;
      }
      if (authState === "valid") {
        navigate(getRedirectPath(params.recruit_id ?? "home"));
        return;
      }
    });
  }, []);

  if (!data) {
    return <div></div>;
  }

  return (
    <div>
      {needRegister ? (
        <div>로딩 중</div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            for (const key in registerInput) {
              if (registerInput[key as keyof typeof registerInput] === "") {
                alert("모든 항목을 입력해주세요.");
                return;
              }
            }
            if (!registerInput.email.includes("@")) {
              alert("이메일 형식이 올바르지 않습니다.");
              return;
            }
            mutate(registerInput);
          }}
        >
          <input
            type="text"
            value={registerInput.first_name}
            placeholder="이름"
            onChange={(e) =>
              setRegisterInput({ ...registerInput, first_name: e.target.value })
            }
          />
          <input
            type="text"
            value={registerInput.last_name}
            placeholder="성"
            onChange={(e) =>
              setRegisterInput({ ...registerInput, last_name: e.target.value })
            }
          />
          <input
            type="text"
            value={registerInput.email}
            placeholder="이메일"
            onChange={(e) =>
              setRegisterInput({ ...registerInput, email: e.target.value })
            }
          />
          <input
            type="text"
            value={registerInput.phone_number}
            placeholder="전화번호"
            onChange={(e) =>
              setRegisterInput({
                ...registerInput,
                phone_number: e.target.value,
              })
            }
          />
          <input type="submit" />
        </form>
      )}
    </div>
  );
}
