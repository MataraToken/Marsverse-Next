"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import eruda from 'eruda';
import { setUsername, setProfilePicture } from '@/services/redux/user';
import { RootState } from '@/services/store';
import WebApp from "@twa-dev/sdk";
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter()
  eruda.init();


  // Configure Telegram WebApp
  WebApp.isClosingConfirmationEnabled = true;
  WebApp.isVerticalSwipesEnabled = false;

  const [isSupported, setIsSupported] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.profile);
  const savedUser = user?.username;
  const initUser = WebApp.initDataUnsafe?.user;

  useEffect(() => {
    if (!savedUser && initUser) {
      dispatch(setUsername(initUser?.username));
      dispatch(setProfilePicture(initUser?.photo_url));
    }
  }, [savedUser, initUser, dispatch]);

 useEffect(() => {
  WebApp.ready();

  // Allow only Android, iOS, and Telegram Desktop
  const allowedPlatforms = ["android", "ios", "tdesktop"];
  if (!allowedPlatforms.includes(WebApp.platform)) {
    setIsSupported(true);
    router.push("supported")
  }else {
    router.push("supported")
  }

  // Expand the WebApp
  if (!WebApp.isExpanded) {
    WebApp.expand();
  }
}, [WebApp]);



  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     
    
    </div>
  );
}
