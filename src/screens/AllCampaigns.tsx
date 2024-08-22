import { useEffect, useState } from "react";
import { useActionActions } from "../context/actions/action";
import { useActionContext } from "../context/providers/action";
import AllActions from "../components/AllActions";
import { Action } from "../types/action";
import { Modal } from "../components/Modal";
import SearchAction from "../components/SearchAction";
import Btn from "../components/Button";
import { LuSearch } from "react-icons/lu";
import BackButton from "../components/BackButton";
import TeamCard from "../components/TeamCard";

type Category = "energy" | "shopping" | "food" | "travel";
type ActionCategory = {
  food: Action[] | null;
  energy: Action[] | null;
  travel: Action[] | null;
  shopping: Action[] | null;
};

const categories: Category[] = ["energy", "shopping", "food", "travel"];
export default function AllCampaignScreen() {
  const { getActions } = useActionActions();
  const { state } = useActionContext();
  const [searchOpened, setSearchOpened] = useState("");
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [actionsCategories, setActionsCategories] = useState<ActionCategory>({
    food: null,
    energy: null,
    travel: null,
    shopping: null,
  });
  useEffect(() => {
    if (!state.actionList) {
      getActions();
    }
  }, [state.actionList]);
  useEffect(() => {
    if (state.actionList) {
      const actionData: ActionCategory = {
        food: null,
        energy: null,
        travel: null,
        shopping: null,
      };
      for (const category of categories) {
        const filtered = state.actionList.filter(
          (action) => action.category === category
        );
        actionData[category] = filtered;
      }
      setActionsCategories(actionData);
    }
  }, [state.actionList]);

  return (
    <section className={`lg:py-5`}>
      <div className="flex items-center justify-between pb-3">
        <BackButton />
        <Btn
          text="Search"
          padding="px-4 py-2"
          textSize="text-xs"
          mode="inline"
          Icon={LuSearch}
          onClick={() => setSearchOpened("Opened")}
        />
      </div>

      <Modal isOpen={searchOpened === "Opened"} closeModal={setSearchOpened}>
        <SearchAction />
      </Modal>
    </section>
  );
}
