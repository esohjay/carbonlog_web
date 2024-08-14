import { Sheet, SheetRef } from "react-modal-sheet";
import { useRef } from "react";
import Btn from "./Button";

type PropType = {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: (arg: string) => void;
};
export const TrackModal: React.FC<PropType> = ({
  children,
  isOpen,
  closeModal,
}) => {
  // const [isOpen, setOpen] = useState(false);
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <>
      {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}

      {/* Opens to 400 since initial index is 1 */}
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={() => closeModal("")}
        snapPoints={[600, 500, 300, 100, 0]}
        initialSnap={1}
        onSnap={(snapIndex) =>
          console.log("> Current snap point index:", snapIndex)
        }
      >
        <Sheet.Container>
          <Sheet.Header>
            <div className="flex justify-end p-5">
              <Btn text="Close" onClick={() => snapTo(4)} mode="inline" />
            </div>
          </Sheet.Header>

          <Sheet.Content>
            <section className="w-full flex justify-center">
              <section className="w-full md:max-w-md lg:bg-slate-50 lg:shadow-md rounded-lg">
                {children}
              </section>
            </section>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};
