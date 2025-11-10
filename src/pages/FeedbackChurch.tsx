import { useNavigate } from "react-router-dom";
import { ChurchFeedbackForm } from "@/components/ChurchFeedbackForm";

export default function FeedbackChurch() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/feedback");
  };

  return (
      <ChurchFeedbackForm onBack={handleBack} />
  );
}
