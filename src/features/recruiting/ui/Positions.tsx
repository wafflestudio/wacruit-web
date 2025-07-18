import { PositionContents } from "./PositionContents";

export const Positions = () => {
  return (
    <section>
      <div>
        <h3>모집 파트</h3>
        <p>
          와플스튜디오의 회원은 준회원(Rookies), 정회원(Programmers),
          디자이너(Designers)로 나뉘어 있습니다.
        </p>
      </div>
      <PositionContents />
    </section>
  );
};
