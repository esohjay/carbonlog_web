import { Sheet, SheetRef } from "react-modal-sheet";
import { useState, useRef } from "react";

export const TrackModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>

      {/* Opens to 400 since initial index is 1 */}
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[600, 400, 100, 0]}
        initialSnap={1}
        onSnap={(snapIndex) =>
          console.log("> Current snap point index:", snapIndex)
        }
      >
        <Sheet.Container>
          <Sheet.Content>
            {children}
            <button onClick={() => snapTo(0)}>Snap to index 0</button>
            <button onClick={() => snapTo(1)}>Snap to index 1</button>
            <button onClick={() => snapTo(2)}>Snap to index 2</button>
            <button onClick={() => snapTo(3)}>Snap to index 3</button>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};
