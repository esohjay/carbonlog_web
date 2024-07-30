type PropType = {
  variant:
    | "default"
    | "success"
    | "blue"
    | "destructive"
    | "pink"
    | "orange"
    | "purple";
  text: string;
  style?: string;
  textStyle?: string;
};
export const Badge = ({
  variant = "default",
  text,
  style,
  textStyle,
  ...props
}: PropType) => {
  const variants = {
    default: {
      container: `bg-gray-100`,
      text: `text-gray-900`,
    },
    success: {
      container: `bg-green-50`,
      text: `text-green-700`,
    },
    blue: {
      container: `bg-blue-50`,
      text: `text-blue-700`,
    },
    destructive: {
      container: `bg-red-700`,
      text: `text-red-50`,
    },
    pink: {
      container: `bg-pink-700`,
      text: `text-pink-50`,
    },
    orange: {
      container: `bg-orange-700`,
      text: `text-orange-50`,
    },
    purple: {
      container: `bg-purple-700`,
      text: `text-purple-50`,
    },
  };

  return (
    <button
      {...props}
      className={`h-6 px-3 justify-center rounded-lg ${variants[variant].container} ${style}`}
    >
      <p className={`text-xs font-bold ${variants[variant].text} ${textStyle}`}>
        {text}
      </p>
    </button>
  );
};
