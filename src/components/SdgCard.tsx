import Image from "./Image";
type SDG = {
  goal: number;
  imgPath: string;
  title: string;
  description: string;
  url: string;
};

type PropType = {
  data: SDG;
};
export default function SdgCard({ data }: PropType) {
  return (
    <section className={`rounded-3xl shadow bg-white`}>
      <div className={`w-full rounded-t-3xl h-80 bg-transparent`}>
        <Image
          height="h-80"
          width="w-full"
          path={data.imgPath}
          borderRadius="rounded-t-3xl"
        />
      </div>
      <p className={`font-medium text-sm text-dark p-5`}>{data.description}</p>
    </section>
  );
}
