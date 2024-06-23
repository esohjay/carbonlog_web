type FeaturesProp = {
  imgPath: string;
  text: string;
  heading: string;
};
export default function Features({ imgPath, text, heading }: FeaturesProp) {
  return (
    <div
      className="text-left px-7 bg-white py-10 rounded-xl shadow-md  cursor-pointer hover:shadow-lg
   hover:bg-white mb-6 transition-all duration-1000 relative hover:-translate-y-1"
    >
      <figure className="absolute p-2 top-[-40px] bg-white rounded-full">
        <img
          src={imgPath}
          width={70}
          height={70}
          className="rounded-full"
          alt={"features"}
        />
      </figure>

      <h3 className="text-xl text-mainColor font-bold mt-5 mb-3">{heading}</h3>
      <p className="text-dark text-sm font-normal">{text}</p>
    </div>
  );
}
