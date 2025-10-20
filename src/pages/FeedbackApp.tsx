import { useNavigate } from "react-router-dom";
import { TwoLevelNav } from "@/components/TwoLevelNav";
import { AppFeedbackForm } from "@/components/AppFeedbackForm";

export default function FeedbackApp() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/feedback");
  };

  return (
    <TwoLevelNav activeMenuId="feedback" activeSubItemPath="/feedback/app">
      <AppFeedbackForm onBack={handleBack} />
    </TwoLevelNav>
  );
}
