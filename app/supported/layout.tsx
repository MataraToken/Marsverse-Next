"use client"
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar'
import { setLeaderboard, setReferrals, setTasks } from '@/services/redux/user';
import { useGetLeaderBoardQuery, useGetReferralsQuery, useGetUserQuery, useGetUserTasksQuery } from '@/services/routes';
import { RootState } from '@/services/store';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Layout({children}: {children: React.ReactNode}) {
    const location = usePathname();
  const user = useSelector((state: RootState) => state.user.profile);
  const username = user?.username;
  const dispatch = useDispatch();

  const {
    data: userData,
    isSuccess: userSuccess,
  } = useGetUserQuery({ username }, { pollingInterval: 300000 });
  const {
    data: referralData,
    isSuccess: referralSuccess,
  } = useGetReferralsQuery({ username }, { pollingInterval: 300000 });
  const {
    data: taskData,
    isSuccess: taskSuccess,
  } = useGetUserTasksQuery({ username }, { pollingInterval: 300000 });

  const {
    data: leaderBoardData,
    isSuccess: leaderBoardSuccess,
    error
  } = useGetLeaderBoardQuery({ pollingInterval: 300000 });

        console.log(leaderBoardData, error, "leaderboard")

  useEffect(() => {
    if (userSuccess) {
      // console.log(userData);
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    if (taskSuccess) {
      dispatch(setTasks(taskData?.data));
    }
  }, [taskData, taskSuccess, dispatch]);

  useEffect(() => {
    if (referralSuccess) {
      dispatch(setReferrals(referralData?.data));
    }
  }, [referralData, referralSuccess, dispatch]);

  useEffect(() => {
    if (leaderBoardSuccess) {
      dispatch(setLeaderboard(leaderBoardData?.data));
    }
  }, [leaderBoardData, leaderBoardSuccess, dispatch]);

    const showBottomNav = !["/profile", "/matara-ranks"].includes(location);
  return (
    <div className="min-h-screen font-montserrat root relative flex flex-col w-full">
      {/* TopBar is always visible */}
      <TopBar />

      {/* Main content area */}
      <div className="overflow-auto flex-grow pb-20">
        {children}
      </div>

      {/* Conditionally render BottomNav */}
      {showBottomNav && <BottomNav />}
    </div>
  )
}

