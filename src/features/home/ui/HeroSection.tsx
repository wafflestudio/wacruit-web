import { DesktopHero } from "./DesktopHero";
import { TabletHero } from "./TabletHero";
import { MobileHero } from "./MobileHero";
import { useMediaQuery } from "./useMediaQuery";

type HeroSectionProps = {
  onScrollToHistory?: () => void;
};

export const HeroSection = ({ onScrollToHistory }: HeroSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 430px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  if (isMobile) return <MobileHero onScrollToHistory={onScrollToHistory} />;
  if (isTablet) return <TabletHero onScrollToHistory={onScrollToHistory} />;
  return <DesktopHero onScrollToHistory={onScrollToHistory} />;
};
