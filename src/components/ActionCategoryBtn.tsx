import Btn from "./Button";
type Category = "energy" | "shopping" | "food" | "travel";
type PropType = {
  categories: Category[];
  currentCategory: Category;
  setCurrentCategory: (arg: Category) => void;
};

export default function ActionCategoryBtn({
  categories,
  currentCategory,
  setCurrentCategory,
}: PropType) {
  return (
    <div
      className={`flex py-4 flex-row gap-x-3 overflow-x-scroll w-full justify-center`}
    >
      {[
        categories.map((category) => (
          <div key={category}>
            <Btn
              variant={category === currentCategory ? "light" : "fill"}
              textSize="text-[10px] lg:text-sm"
              padding="px-3 py-1"
              text={category}
              onClick={() => setCurrentCategory(category)}
            />
          </div>
        )),
      ]}
    </div>
  );
}
