import ActionStat from "../components/ActionStat";
import { ProgressBar } from "../components/ProgressBar";
import MyActionCard from "../components/MyActionCard";
import ActionsList from "../components/ActionsList";
import useGetActions from "../lib/useGetActions";
// import { useNavigate} from "react-router-dom";
// import Btn from "../components/Button";
import { FaEarthEurope } from "react-icons/fa6";
import { IoTrophy } from "react-icons/io5";
import { IoCloud } from "react-icons/io5";
import LinkBtn from "../components/LinkBtn";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ActScreen({}) {
  const { actionSummary, actions, pointDetails } = useGetActions();
  const { userId } = useParams();
  //   const navigate = useNavigate()

  return (
    <section className={`lg:py-5`}>
      <section className={``}>
        <div
          className={`flex w-full flex-row gap-x-2 justify-between flex-wrap mb-5`}
        >
          <ActionStat
            text={"Actions taken"}
            Icon={FaEarthEurope}
            bgColor={"#f5b700"}
            value={actionSummary.actionTaken}
          />
          <ActionStat
            text={"Points earned"}
            Icon={IoTrophy}
            bgColor={"#0d47a1"}
            value={actionSummary.pointsEarned}
          />
          <ActionStat
            text={"Carbon saved"}
            Icon={IoCloud}
            bgColor={"#f5b700"}
            value={`${actionSummary.carbonSaved.toFixed(2)}kg`}
          />
        </div>
        {pointDetails && (
          <section>
            <ProgressBar
              progress={pointDetails.percentage}
              containerStyle=""
              barStyle=""
            />
            <article className={`flex flex-row justify-between items-center`}>
              <p className={`text-xs font-medium text-dark`}>
                Achieve {pointDetails.remainder} more points to leavel up!
              </p>
              <p className={`text-xs font-medium text-green-500`}>
                {actionSummary.pointsEarned}/{pointDetails.target}
              </p>
            </article>
          </section>
        )}

        <div className={`flex flex-col items-start gap-y-3 py-5`}>
          <p className={`text-lg font-bold text-mainColor`}>Recent action</p>
          {actions && actions.length > 0 && <MyActionCard data={actions[0]} />}

          <LinkBtn
            text={"See my actions"}
            variant="fill"
            path={`/${userId}/my-actions`}
            mode="inline"
          />
        </div>
        <div className={`h-[1px] bg-gray-200 w-full`}></div>
        <div className={`pt-5 pb-2 flex justify-between flex-row items-center`}>
          <p className={`text-lg font-bold text-mainColor`}>Actions</p>
          <Link
            className={`text-secondaryAlt text-base font-normal`}
            to={`/${userId}/all-actions`}
          >
            See all
          </Link>
        </div>
        <ActionsList />
        <div className={`py-3 flex items-center`}>
          <LinkBtn
            text={"See all actions"}
            mode="inline"
            // className={`w-2/3`}
            path={`/${userId}/all-actions`}
          />
        </div>
        {/* <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 25 }}
          className={`shadow-lg bg-white rounded-3xl flex-1 flex`}
        >
          <View className={`p-5 flex-1 flex`}>
            <FlatList
              data={actions.length && actions}
              // extraData={refresh}
              ItemSeparatorComponent={() => (
                <View style={{ height: 10, width: 8 }}></View>
              )}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return <MyActionCard data={item} />;
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </BottomSheetModal> */}
      </section>
    </section>
  );
}

export default ActScreen;
