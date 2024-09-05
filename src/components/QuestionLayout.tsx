import Btn from "./Button";
import { useNavigate } from "react-router-dom";
import { useSurveyContext } from "../context/providers/survey";
import { IconType } from "react-icons";

type PropType = {
  section: string;
  Icon: IconType;
  color: string;
  progress: string;
  disabled?: boolean;
  nextScreen: () => void;
  btnText?: string;
  children: React.ReactNode;
};

export default function QuestionLayout({
  section,
  Icon,
  color,
  progress,
  disabled,
  nextScreen,
  btnText = "Next",
  children,
}: PropType) {
  const navigate = useNavigate();
  const { state } = useSurveyContext();
  return (
    <section className={`py-3`}>
      {/* Heading */}
      <section className={`flex flex-col gap-y-2`}>
        <section className={`flex flex-row items-center gap-x-2`}>
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full ${color} p-2`}
          >
            <Icon size={24} color="white" />
          </div>
          <div className={`flex flex-row gap-x-5 items-center`}>
            <p className={`font-bold capitalize text-dark text-xl`}>
              {section}
            </p>
            <p className={`font-bold capitalize text-dark text-xl`}></p>
          </div>
        </section>
        <section
          className={`w-full flex flex-col bg-gray-300 p-[2px] rounded-full`}
        >
          <div
            style={{ width: progress }}
            className={` ${color} h-1 rounded-md `}
          ></div>
        </section>
      </section>
      {/* Form */}
      <section className={`py-4`}>
        <section className={`pb-3`}>{children}</section>
        <div className={`mt-5 flex flex-col gap-2`}>
          <Btn
            variant={disabled ? "disabled" : "black"}
            textSize={`text-base`}
            text={btnText}
            disable={disabled}
            onClick={nextScreen}
            isLoading={state?.loading}
          />
          <button
            className={`text-center block font-bold py-2 underline text-mainColor`}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </section>
    </section>
  );
}
