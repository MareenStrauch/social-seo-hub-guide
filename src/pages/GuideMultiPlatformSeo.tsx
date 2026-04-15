import { GuidePage } from "@/components/guide/GuidePage";
import guidesData from "@/data/guides-content.json";

const allGuides = guidesData.guides;
const guide = allGuides.find((g) => g.id === "multi-platform-seo-2026")!;

const GuideMultiPlatformSeo = () => <GuidePage guide={guide} allGuides={allGuides} />;
export default GuideMultiPlatformSeo;
