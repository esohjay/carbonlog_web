import { useNavigate, useParams } from "react-router-dom";

export default function useSurveyNextPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const nextScreen = (screenName: string, isSubmit?: boolean) => {
    if (isSubmit) {
      return navigate(`/${userId}/${screenName}`);
    } else {
      return navigate(`/${userId}/survey/${screenName}`);
    }
  };

  return nextScreen;
}
