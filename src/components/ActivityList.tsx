import ActivityCard from "./ActivityCard";
import { Activity, ActivityList } from "../types/track";

type PropType = {
  sliderData: Activity[];
  heading: string;
  total: number;
  category: keyof ActivityList;
};
export default function ActivityLists({
  sliderData,
  heading,
  total,
  category,
}: PropType) {
  return (
    <section className={`p-5 flex flex-col flex-1  bg-white`}>
      <p className={`font-semibold text-lg text-mainColor `}>{heading}</p>

      <p className={`font-semibold text-sm text-dark mb-5`}>
        Total of {total} kg of C02e
      </p>
      {/* <p className={`font-semibold text-sm text-dark mb-5`}>
        Total of {total}
        kg <Text className={`text-sm `}>of C0</Text>
        <Text className={`text-xs leading-3`}>2e</Text>
      </Text> */}

      {sliderData.map((item) => (
        <ActivityCard key={item.id} data={item} category={category} />
      ))}
    </section>
  );
}
