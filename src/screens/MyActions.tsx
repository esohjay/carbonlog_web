import useGetActions from "../lib/useGetActions";
import MyActionCard from "../components/MyActionCard";
import BackButton from "../components/BackButton";

export default function MyActions() {
  const { actions } = useGetActions();
  return (
    <section className="lg:py-5">
      <BackButton />
      <section className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
        {actions &&
          actions.length > 0 &&
          actions.map((action) => (
            <MyActionCard key={action.title} data={action} />
          ))}
      </section>
    </section>
  );
}
