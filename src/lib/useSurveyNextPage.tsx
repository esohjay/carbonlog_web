import { useNavigate, useParams } from "react-router-dom";

export default function useSurveyNextPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const nextScreen = (screenName: string) =>
    navigate(`/${userId}/survey/${screenName}`);
  return nextScreen;
}
