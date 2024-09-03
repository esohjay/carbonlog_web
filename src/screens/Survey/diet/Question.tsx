import Btn from "../../../components/Button";
import { useSurveyContext } from "../../../context/providers/survey";
import { useSurveyActions } from "../../../context/actions/survey";

export default function DietQuestion() {
  const { state } = useSurveyContext();
  const { survey } = state;
  const { updateSurvey } = useSurveyActions();
  return (
    <section>
      <p className={`font-semibold text-lg mb-3 text-mainColor`}>
        How would you describe your diet?
      </p>
      <section className={`flex gap-y-5 py-5`}>
        <Btn
          variant={survey.survey.diet === "highMeatEater" ? "light" : "black"}
          textSize={`text-base`}
          text={"High Meat Eater"}
          onClick={() => updateSurvey({ diet: "highMeatEater" })}
        />
        <Btn
          variant={survey.survey.diet === "mediumMeatEater" ? "light" : "black"}
          textSize={`text-base`}
          text={"Medium Meat Eater"}
          onClick={() => updateSurvey({ diet: "mediumMeatEater" })}
        />
        <Btn
          variant={survey.survey.diet === "lowMeatEater" ? "light" : "black"}
          textSize={`text-base`}
          text={"Low Meat Eater"}
          onClick={() => updateSurvey({ diet: "lowMeatEater" })}
        />
        <Btn
          variant={survey.survey.diet === "fishEater" ? "light" : "black"}
          textSize={`text-base`}
          text={"Fish Eater"}
          onClick={() => updateSurvey({ diet: "fishEater" })}
        />
        <Btn
          variant={survey.survey.diet === "vegetarian" ? "light" : "black"}
          textSize={`text-base`}
          text={"Vegetarian"}
          onClick={() => updateSurvey({ diet: "vegetarian" })}
        />
        <Btn
          variant={survey.survey.diet === "vegan" ? "light" : "black"}
          textSize={`text-base`}
          text={"Vegan"}
          onClick={() => updateSurvey({ diet: "vegan" })}
        />
      </section>
    </section>
  );
}
