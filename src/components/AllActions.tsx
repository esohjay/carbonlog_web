import ActionCard from "./ActionCard";
import ActionCategoryBtn from "./ActionCategoryBtn";
import { Action } from "../types/action";

type Category = "energy" | "shopping" | "food" | "travel";
type PropType = {
  categories: Category[];
  currentCategory: Category;
  setCurrentCategory: (arg: Category) => void;
  filteredActions: Action[] | null;
};

export default function AllActions({
  filteredActions,
  categories,
  currentCategory,
  setCurrentCategory,
}: PropType) {
  return (
    <section className={`flex flex-col gap-2`}>
      <ActionCategoryBtn
        categories={categories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActions &&
          filteredActions.map((action) => (
            <ActionCard data={action} isFullWidth={true} key={action.id} />
          ))}
      </section>
    </section>
  );
}
