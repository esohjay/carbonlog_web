import CampignCard from "./CampaignCard";
// import { useCampaignContext } from "../context/providers/campaign";
// import CampaignRoundSkeleton from "./skeletons/CampaignRound";
import Spinner from "./Spinner";
import useGetCampaigns from "../lib/useGetCampaigns";
function CampaignList() {
  //   const { state } = useCampaignContext();
  const { campaign } = useGetCampaigns();

  return (
    <>
      {campaign ? (
        <section className={`flex flex-row gap-x-5 mb-2 w-full `}>
          <div className={`flex flex-row gap-x-5 w-full overflow-x-scroll`}>
            {[
              campaign?.map((data, i) => {
                if (i < 5)
                  return (
                    <CampignCard
                      title={data.title}
                      id={data.id}
                      key={data.id}
                    />
                  );
              }),
            ]}
          </div>
        </section>
      ) : (
        // <CampaignRoundSkeleton loadingState={state?.fetchingCampaign} />
        <Spinner />
      )}
    </>
  );
}

export default CampaignList;
