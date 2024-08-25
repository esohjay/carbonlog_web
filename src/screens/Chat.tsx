import { useEffect, useState, useRef } from "react";
import { Message } from "../types/campaign";
import { useAuthContext } from "../context/providers/auth";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { db } from "../lib/firebaseConfig";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { useCampaignActions } from "../context/actions/campaign";
import Btn from "../components/Button";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
dayjs.extend(localizedFormat);
// dayjs.extend(relativeTime);
type Inputs = {
  message: string;
};
export default function Chat() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { state: userState } = useAuthContext();
  const { sendMessage } = useCampaignActions();
  const { title, campaignId } = useParams();
  const [messages, setMessages] = useState<Message[] | null>(null);
  // const [message, setMessage] = useState('')
  //   const splitTitle = title?.split(" ");
  //   const abbrev =
  //     splitTitle.length > 2
  //       ? `${splitTitle[0].charAt(0)}${splitTitle[1].charAt(0)}`
  //       : `${splitTitle[0].charAt(0)}${splitTitle[0].charAt(1)}`;

  const { register, handleSubmit, resetField } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (campaignId) {
      resetField("message");
      sendMessage({ ...data, id: campaignId });
    }
  };

  useEffect(() => {
    if (campaignId) {
      const q = query(
        collection(db, "campaign", campaignId, "messages"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages: Message[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Message, "id">),
          messageId: doc.id,
        }));
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, []);
  // Helper function to scroll chat to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <section className={`relative py- lg:py-2 h-[77vh h-[calc(100vh-147px)] `}>
      <section className={`h-[90%] overflow-y-scroll`} ref={chatContainerRef}>
        {messages &&
          messages.map((message, i) => (
            <section
              key={`${message.message}-${i}`}
              className={`flex flex-row mb-2  ${
                message.sender.id === userState?.user?.uid
                  ? "justify-end"
                  : "justify-start"
              }
              `}
            >
              <article
                className={`rounded-xl px-3 flex flex-col gap-1  py-[6px] ${
                  message.sender.id === userState?.user?.uid
                    ? "bg-mainColor text-primaryLight"
                    : "text-mainColor bg-altColor"
                }`}
              >
                {message.sender.id !== userState?.user?.uid && (
                  <p className={`text-green-600 font-normal text-[10px]`}>
                    {message.sender?.name}
                  </p>
                )}
                <p
                  className={`rounded-full text-sm font-medium  ${
                    message.sender.id === userState?.user?.uid
                      ? " text-primaryLight"
                      : "text-mainColor "
                  } `}
                >
                  {message.message}
                </p>
                <p
                  className={`${
                    message.sender.id === userState?.user?.uid
                      ? " text-primaryLight"
                      : "text-mainColor "
                  } font-normal text-[10px] self-end`}
                >
                  {dayjs(message.timestamp.seconds * 1000).format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </p>
              </article>
            </section>
          ))}
      </section>
      <section
        className={`flex h-[10%] items-center flex-row justify-between messages-center gap-x-2 absolute bottom-2 left-0 w-full `}
      >
        <div className={`w-[90%]`}>
          <div className="flex items-center  p-2 bg-white rounded-md border">
            <input
              {...register("message", { required: true })}
              className="bg-transparent text-sm block w-full border-none outline-none px-2"
              placeholder="say something"
            />
          </div>
        </div>
        {/* {errors.message && (
              <Text className={`mt-1 text-sm text-red-500`}>type a message</Text>
            )} */}

        <button onClick={handleSubmit(onSubmit)} className={`w-[10%]`}>
          <IoSend name={"send"} size={24} color="#7d4f50" />
        </button>
      </section>
    </section>
  );
}
