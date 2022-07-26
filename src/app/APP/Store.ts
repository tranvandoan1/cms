import { configureStore } from "@reduxjs/toolkit";
import artistsSlice from "../Features/ArtistSlice/ArtistSlice";
import setListsSlice from "../Features/SetListSlice/SetListSlice";
import songSlices from "../Features/SongSlice/SongSlice";
import memberSlice from "../Features/MemberSlice/MemberSlice";
import StagePlot from "../Features/Slide/StagePlot";
import authSlide from "../Features/Slide/AuthSlide";
export const store = configureStore({
  reducer: {
    artist: artistsSlice,
    setlist: setListsSlice,
    songs: songSlices,
    member: memberSlice,
    stagePlot: StagePlot,
    user: authSlide,
  },
});
export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
