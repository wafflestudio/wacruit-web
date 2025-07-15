export const ApplicantRequirements = () => {
  const requirements = [
    {
      iconSrc: "",
      alt: "서울대학교 학생",
      label: "현재 서울대학교에 재학/휴학 중이거나 졸업하신 분",
    },
    {
      iconSrc: "",
      alt: "열정",
      label: "학과/학번과 무관하게 개발에 대한 열정이 있으신 분",
    },
    {
      iconSrc: "",
      alt: "필수 활동 기간",
      label: "두 학기 이상 활동 가능하신 분",
    },
    {
      iconSrc: "",
      alt: "개발에 대한 관심",
      label: "멋진 서비스를 만들고 싶으신 분",
    },
  ];
  return (
    <section>
      <h3>모집 대상</h3>
      <div>
        <div>
          {requirements.map(({ iconSrc, label, alt }, idx) => (
            <div key={`requirements-${idx}`}>
              <img src={iconSrc} alt={alt} />
              <p>{label}</p>
            </div>
          ))}
        </div>
        <p>⚠️ 와플스튜디오의 필수 활동 기간은 두 학기입니다.</p>
      </div>
    </section>
  );
};
