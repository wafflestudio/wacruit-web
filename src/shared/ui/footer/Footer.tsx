import styled from "styled-components";
import { theme } from "../../styles/designSystem";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <LogoRow>
          <LogoLink href="/">
            <Logo src="/logo_footer.svg" alt="Waffle Studio Logo" />
          </LogoLink>
          <Email>contact@wafflestudio.com</Email>
        </LogoRow>

        <LinksRow>
          <LinkItem
            href="https://www.instagram.com/wafflestudio_official/"
            target="_blank"
            rel="noopener noreferrer"
          >
            인스타그램
          </LinkItem>
          <LinkItem
            href="https://github.com/wafflestudio"
            target="_blank"
            rel="noopener noreferrer"
          >
            깃허브
          </LinkItem>
          <LinkItem
            href="https://medium.com/wafflestudio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            블로그
          </LinkItem>
          <LinkItem href="/members">후원자 및 멤버</LinkItem>
        </LinksRow>

        <Copyright>© 2025 Waffle Studio. All rights reserved.</Copyright>
      </FooterInner>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  padding: 60px 0;
  background: ${theme.colors.black[900]};
`;

const FooterInner = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 100%;
`;

const LogoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  flex-direction: row;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 27px;
`;

const Email = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes[16]};
  font-weight: ${theme.fontWeights.medium};
  line-height: ${theme.lineHeights.base};
  letter-spacing: -0.16px;

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

const LinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const LinkItem = styled.a`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes[16]};
  font-weight: ${theme.fontWeights.semibold};
  line-height: ${theme.lineHeights.base};
  letter-spacing: -0.16px;
  text-decoration: none;

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

const Copyright = styled.div`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes[14]};
  font-weight: ${theme.fontWeights.medium};
  line-height: ${theme.lineHeights.base};
  letter-spacing: -0.14px;
  text-align: left;
  width: 100%;

  @media (max-width: 767px) {
    font-size: ${theme.fontSizes[14]};
  }
`;
