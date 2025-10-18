import { useNavigate } from "react-router-dom";
import { AppFeedbackForm } from "@/components/AppFeedbackForm";

export default function FeedbackApp() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/feedback");
  };

  return <AppFeedbackForm onBack={handleBack} />;
}
