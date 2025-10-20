import { useNavigate } from "react-router-dom";
import { TwoLevelNav } from "@/components/TwoLevelNav";
import { ChurchFeedbackForm } from "@/components/ChurchFeedbackForm";

export default function FeedbackChurch() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/feedback");
  };

  return (
    <TwoLevelNav activeMenuId="feedback" activeSubItemPath="/feedback/church">
      <ChurchFeedbackForm onBack={handleBack} />
    </TwoLevelNav>
  );
}
