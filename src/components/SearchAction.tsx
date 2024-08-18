import React, { useState, useEffect, useCallback } from "react";
import { useActionActions } from "../context/actions/action";
import { useActionContext } from "../context/providers/action";
import ActionCard from "../components/ActionCard";
// import BackButton from "../components/BackButton";
import { Action } from "../types/action";

export default function SearchAction() {
  const { getActions } = useActionActions();
  const { state } = useActionContext();
  const [filteredActions, setFilteredActions] = useState<
    Action[] | undefined
  >();
  const [refresh, setRefresh] = useState(false);
  //   const {
  //     control,
  //     handleSubmit,
  //     setError,
  //     formState: { errors },
  //   } = useForm<Inputs>();
  //   const onSubmit: SubmitHandler<Inputs>  => {
  //     console.log(data);
  //   };

  const findAction = (query: string) => {
    if (!query) return setFilteredActions([]);

    const result = state?.actionList?.filter((action) => {
      return action.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredActions(result);
    setRefresh(!refresh);
  };
  //delay finding of schools as user type
  function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = 1000
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  //   const debounce = (func, delay = 1000) => {
  //     let timeoutId;
  //     return (...args) => {
  //       if (timeoutId) {
  //         clearTimeout(timeoutId);
  //       }
  //       timeoutId = setTimeout(() => {
  //         func.apply(null, args);
  //       }, delay);
  //     };
  //   };
  const optimizedFn = useCallback(debounce(findAction), []);
  useEffect(() => {
    if (!state.actionList) {
      getActions();
    }
  }, [state.actionList]);
  return (
    <section
      className={`relative flex flex-col px-5 bg-white rounded-b-3xl shadow-md`}
    >
      {/* <BackButton /> */}
      <section className={`h-full  py-2`}>
        <p className={`font-semibold text-base mb-2 text-mainColor`}>
          Search actions
        </p>
        <article>
          <div className={`lg:w-1/3`}>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                optimizedFn(e.target.value)
              }
              autoFocus
              placeholder="Enter atleast 3 characters"
              className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
              // label={"Distance travelled"}
              //   value={value}
            />
          </div>
        </article>

        <article className={`grid grid-cols-1 md:grid-cols-2 py-3`}>
          {filteredActions &&
            filteredActions.map((action) => (
              <ActionCard key={action.id} data={action} isFullWidth={true} />
            ))}
        </article>
      </section>
    </section>
  );
}
