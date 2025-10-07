

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setProfilePicture } from "@/services/redux/user";
import { RootState } from "@/services/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.profile);

  // ✅ Initialize eruda only on client
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import eruda (only in browser)
   

    // Dynamically import Telegram WebApp SDK
    import("@twa-dev/sdk").then(({ default: WebApp }) => {
      WebApp.isClosingConfirmationEnabled = true;
      WebApp.isVerticalSwipesEnabled = false;

      const savedUser = user?.username;
      const initUser = WebApp.initDataUnsafe?.user;

      if (!savedUser && initUser) {
        dispatch(setUsername(initUser?.username));
        dispatch(setProfilePicture(initUser?.photo_url));
      }

      WebApp.ready();

      const allowedPlatforms = ["android", "ios", "tdesktop"];
      if (!allowedPlatforms.includes(WebApp.platform)) {
        router.push("/unsupported");
      } else {
        router.push("/supported");
      }

      if (!WebApp.isExpanded) {
        WebApp.expand();
      }
    });
  }, [dispatch, user, router]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    </div>
  );
}
