import { createSlice } from "@reduxjs/toolkit";

// Types
import { GroupMemberModal } from "../types/StateTypes";

const initialState: GroupMemberModal = {
  isOpen: false,
  members: [],
};

const groupMemberModalSlice = createSlice({
  name: "groupMemberModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    deleteMember: (state, action) => {
      state.members = state.members.filter(
        (member) => member.member_id !== action.payload
      );
    },
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
  },
});

export const { openModal, closeModal, setMembers, deleteMember, addMember } =
  groupMemberModalSlice.actions;
export default groupMemberModalSlice.reducer;
