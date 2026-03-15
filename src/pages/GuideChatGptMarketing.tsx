import { GuidePage } from "@/components/guide/GuidePage";
import guidesData from "@/data/guides-content.json";

const allGuides = guidesData.guides;
const guide = allGuides.find((g) => g.id === "chatgpt-marketing")!;

const GuideChatGptMarketing = () => <GuidePage guide={guide} allGuides={allGuides} />;
export default GuideChatGptMarketing;
