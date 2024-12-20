import { useState } from "react";
import { Modal } from "../components/Modal";
import SearchCampaign from "../components/SearchCampaign";
import Btn from "../components/Button";
import { LuSearch } from "react-icons/lu";
import BackButton from "../components/BackButton";
import TeamCard from "../components/TeamCard";
import { useCampaignContext } from "../context/providers/campaign";
import useGetCampaigns from "../lib/useGetCampaigns";

export default function AllCampaignScreen() {
  const [searchOpened, setSearchOpened] = useState("");
  const { state } = useCampaignContext();
  const {} = useGetCampaigns();
  return (
    <section className={`lg:py-5`}>
      <div className="flex items-center justify-between pb-3">
        <BackButton />
        <Btn
          text="Search"
          padding="px-4 py-2"
          textSize="text-xs"
          mode="inline"
          Icon={LuSearch}
          onClick={() => setSearchOpened("Opened")}
        />
      </div>
      <section className={`grid grid-cols-1 md:grid-cols-2 gap-3`}>
        {state?.campaignList &&
          state?.campaignList?.length &&
          state.campaignList.map((campaign) => (
            <TeamCard data={campaign} key={campaign.id} isFullWidth={true} />
          ))}
      </section>
      <Modal isOpen={searchOpened === "Opened"} closeModal={setSearchOpened}>
        <SearchCampaign />
      </Modal>
    </section>
  );
}
