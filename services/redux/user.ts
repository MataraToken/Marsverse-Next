/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const safeLocalStorage = {
  getItem: (key: string) => {
    if (!isBrowser) return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  },
};

const getUserFromLocalStorage = () => {
  try {
    const user = safeLocalStorage.getItem("matara-user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    safeLocalStorage.removeItem("matara-user");
    return null;
  }
};

const getMissonsFromLocalStorage = () => {
  try {
    const missions = safeLocalStorage.getItem("matara-missions");
    return missions ? JSON.parse(missions) : [];
  } catch (error) {
    console.error("Failed to parse missions from localStorage", error);
    safeLocalStorage.removeItem("matara-missions");
    return [];
  }
};

export interface User {
  username: string | null;
  points: number;
  referrals: number;
  level: number;
  currentTapCount: number;
  refillValue: number;
  tapTime: string | null; // ISO string or null
  onboarding: boolean;
  referralCode?: string | null; // optional, since it’s commented out
  profilePicture: string;
}

const getMiningStatusFromLocalStorage = () => {
  try {
    const status = safeLocalStorage.getItem("matara-mining-status");
    return status ? JSON.parse(status) : false;
  } catch (error) {
    console.error("Failed to parse mining status from localStorage", error);
    safeLocalStorage.removeItem("matara-mining-status");
    return false;
  }
};

const getMiningStartDateFromLocalStorage = () => {
  try {
    const date = safeLocalStorage.getItem("matara-mining-start-date");
    return date ? JSON.parse(date) : null;
  } catch (error) {
    console.error("Failed to parse mining start date from localStorage", error);
    safeLocalStorage.removeItem("matara-mining-start-date");
    return null;
  }
};

export interface State {
  profile: User | null;
  bonus: any;
  userCabal: any;
  referrals: any[];
  tasks: any[];
  cabal: any[];
  leaderBoard: any[];
  milestones: any[];
  boosts: any[];
  missions: any[];
  miningStatus: boolean;
  miningStartDate: string | null;
}

const defaultProfile: User = {
  username: null,
  points: 0,
  referrals: 0,
  level: 1,
  currentTapCount: 0,
  refillValue: 0,
  tapTime: null,
  onboarding: true,
  referralCode: null,
  profilePicture: "",
};

const initialState: State = {
  profile: getUserFromLocalStorage() || defaultProfile,
  bonus: null,
  userCabal: null,
  referrals: [],
  tasks: [],
  cabal: [],
  leaderBoard: [],
  milestones: [],
  boosts: [],
  missions: getMissonsFromLocalStorage() || [],
  miningStatus: getMiningStatusFromLocalStorage(),
  miningStartDate: getMiningStartDateFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      if (action.payload) {
        safeLocalStorage.setItem("matara-user", JSON.stringify(action.payload));
      } else {
        safeLocalStorage.removeItem("matara-user");
      }
    },
    setLevel: (state, action) => {
      if (state.profile) {
        state.profile.level = action.payload;
        safeLocalStorage.setItem("matara-user", JSON.stringify(state.profile));
      }
    },
    setTapTime: (state, action) => {
      if (state.profile) {
        state.profile.tapTime = action.payload;
        safeLocalStorage.setItem("matara-user", JSON.stringify(state.profile));
      }
    },
    setUsername: (state, action) => {
      if (!state.profile) {
        state.profile = {
          username: action.payload,
          points: 0,
          referrals: 0,
          level: 1,
          currentTapCount: 0,
          refillValue: 0,
          tapTime: null,
          onboarding: true,
          profilePicture: "",
        };
      } else {
        state.profile.username = action.payload;
      }
      safeLocalStorage.setItem("matara-user", JSON.stringify(state.profile));
    },
    setProfilePicture: (state, action) => {
      if (!state.profile) {
        state.profile = {
          username: null,
          points: 0,
          referrals: 0,
          level: 1,
          currentTapCount: 0,
          refillValue: 0,
          tapTime: null,
          onboarding: true,
          profilePicture: action.payload,
        };
      } else {
        state.profile.profilePicture = action.payload;
      }
      safeLocalStorage.setItem("matara-user", JSON.stringify(state.profile));
    },
    setPoints: (state, action) => {
      if (state.profile) {
        state.profile.points = action.payload;
        safeLocalStorage.setItem("matara-user", JSON.stringify(state.profile));
      }
    },
    setOnboarding: (state, action) => {
      if (state.profile) {
        state.profile.onboarding = action.payload;
        safeLocalStorage.setItem("matara-user", JSON.stringify(state.profile));
      }
    },

    startMission: (state, action) => {
      const missions = state.missions;
      const singleMission = action.payload;
      const isAlreadyActive = missions.some(
        (m: any) => m._id === singleMission._id
      );
      if (!isAlreadyActive) {
        state.missions.push(singleMission);
      }

      safeLocalStorage.setItem("matara-missions", JSON.stringify(state.missions));
    },
    clearMission: (state) => {
      state.missions = [];
      safeLocalStorage.setItem("matara-missions", JSON.stringify(state.missions));
    },
    removeActiveMission: (state, action) => {
      state.missions = state.missions.filter(
        (mission: any) => mission._id !== action.payload._id
      );
      safeLocalStorage.setItem("matara-missions", JSON.stringify(state.missions));
    },
    updateMissionStatus: (state, action) => {
      const singleMission = action.payload;
      const mission = state.missions.find(
        (m: any) => m._id === singleMission?._id
      );
      if (mission) {
        mission.status = singleMission?.status;
      }
      safeLocalStorage.setItem("matara-missions", JSON.stringify(state.missions));
    },
    // setLevel: (state) => {
    //   state.user.level = state.user.level += 1;
    //   localStorage.setItem("flower-user", JSON.stringify(state.user));
    // },
    setRefillValue: (state) => {
      if (state.profile) {
        state.profile.refillValue = state.profile.refillValue + 1;
        safeLocalStorage.setItem("matara-user", JSON.stringify(state.profile));
      }
    },

    setReferrals: (state, action) => {
      state.referrals = action.payload;
    },
    setMilestones: (state, action) => {
      state.milestones = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLeaderboard: (state, action) => {
      state.leaderBoard = action.payload;
    },
    setBoosts: (state, action) => {
      state.boosts = action.payload;
    },
    setBonus: (state, action) => {
      state.bonus = action.payload;
    },
    setMiningStatus: (state, action: PayloadAction<boolean>) => {
      state.miningStatus = action.payload;
      safeLocalStorage.setItem(
        "matara-mining-status",
        JSON.stringify(action.payload)
      );
    },
    setMiningStartDate: (state, action: PayloadAction<string | null>) => {
      state.miningStartDate = action.payload;
      safeLocalStorage.setItem(
        "matara-mining-start-date",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const {
  setUsername,
  setProfilePicture,
  setPoints,
  setLevel,
  setTasks,
  setReferrals,
  setLeaderboard,
  startMission,
  removeActiveMission,
  updateMissionStatus,
  clearMission,
  setOnboarding,
  setMilestones,
  setBoosts,
  setBonus,
  setTapTime,
  setProfile,
  setRefillValue,
  setMiningStatus,
  setMiningStartDate,
} = userSlice.actions;

export default userSlice.reducer;
