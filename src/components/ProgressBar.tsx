type PropType = {
  variant: "success" | "default" | "warning" | "destructive";
  progress: number;
  containerStyle: string;
  barStyle: string;
};

export const ProgressBar = ({
  variant = "success",
  progress,
  containerStyle,
  barStyle,
}: PropType) => {
  const variants = {
    default: `bg-blue-400`,
    success: `bg-emerald-400`,
    destructive: `bg-red-400`,
    warning: `bg-amber-400`,
  };

  const getWidth = () => {
    if (progress > 100) {
      return "100%";
    }

    if (progress < 0) {
      return "0%";
    }

    return `${progress}%`;
  };

  return (
    <section
      className={`h-[6px] bg-gray-200 rounded-full w-full ${containerStyle}`}
    >
      <div
        style={{ width: getWidth() }}
        className={`h-[6px] rounded-full ${variants[variant]} ${barStyle}`}
      ></div>
    </section>
  );
};
