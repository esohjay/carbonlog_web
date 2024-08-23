import React, { useState, useCallback } from "react";
import { useCampaignContext } from "../context/providers/campaign";
import TeamCard from "./TeamCard";
// import BackButton from "../components/BackButton";
import { Campaign } from "../types/campaign";

export default function SearchCampaign() {
  const { state } = useCampaignContext();
  const [filteredCampaigns, setFilteredCampaigns] = useState<
    Campaign[] | undefined
  >();
  const [refresh, setRefresh] = useState(false);

  const findAction = (query: string) => {
    if (!query) return setFilteredCampaigns([]);

    const result = state?.campaignList?.filter((campaign) => {
      return campaign.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredCampaigns(result);
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
          {filteredCampaigns &&
            filteredCampaigns.map((action) => (
              <TeamCard key={action.id} data={action} isFullWidth={true} />
            ))}
        </article>
      </section>
    </section>
  );
}
