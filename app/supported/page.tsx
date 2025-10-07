"use client"
import MiningStatus from "@/components/home/MiningStatus";
import { useGetUserQuery } from "@/services/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { useEffect } from "react";
import { setProfile } from "@/services/redux/user";

function Home() {
  const profile = useSelector((state: RootState) => state.user.profile);
  const savedUser = profile?.username;
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetUserQuery({ username: savedUser }, {pollingInterval: 50000});
  const user = data?.data;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProfile(user));
    }
  }, [isSuccess, dispatch, user]);

  useEffect(() => {
    (async () => {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        WebApp.BackButton.hide();
    })();
}, []);


  return (
    <div >
      <MiningStatus />
    </div>
  );
}

export default Home;
