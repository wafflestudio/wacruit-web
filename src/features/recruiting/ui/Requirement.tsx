import styled from "styled-components";
import {
  SnuIcon,
  FireIcon,
  CubeIcon,
  LaptopIcon,
} from "../../../components/icons/recruiting";

export const Requirement = () => {
  const requirements = [
    {
      IconComponent: SnuIcon,
      label: "현재 서울대학교에 재학∙휴학중이거나 졸업하신 분",
    },
    {
      IconComponent: FireIcon,
      label: "학과/학번과 무관하게 개발에 대한 열정이 있으신 분",
    },
    {
      IconComponent: CubeIcon,
      label: "두 학기 이상 활동 가능하신 분(필수)",
    },
    {
      IconComponent: LaptopIcon,
      label: "멋진 서비스를 만들고 싶으신 분",
    },
  ];

  return (
    <RequirementContainer>
      <RequirementContent>
        <RequirementTitle>지원 조건</RequirementTitle>
        <RequirementGrid>
          {requirements.map(({ IconComponent, label }, idx) => (
            <RequirementCard key={`requirements-${idx}`}>
              <IconWrapper>
                <IconComponent />
              </IconWrapper>
              <RequirementText>{label}</RequirementText>
            </RequirementCard>
          ))}
        </RequirementGrid>
      </RequirementContent>
    </RequirementContainer>
  );
};

const RequirementContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const RequirementContent = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const RequirementTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  align-self: stretch;
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.32px;
`;

const RequirementGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;
`;

const RequirementCard = styled.div`
  display: flex;
  width: 244px;
  height: 291px;
  padding: 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;

const IconWrapper = styled.div`
  /* TODO: 아이콘 크기 및 스타일링 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const RequirementText = styled.p`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 150%;
  letter-spacing: -0.18px;
`;
