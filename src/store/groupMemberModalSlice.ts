import { createSlice } from "@reduxjs/toolkit";

// Types
import { GroupMemberModal } from "../types/StateTypes";

const initialState: GroupMemberModal = {
  isOpen: false,
  group_id: 0,
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
    setGroupId: (state, action) => {
      state.group_id = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.group_id = action.payload.group_id;
      state.members = action.payload.members;
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

export const {
  openModal,
  closeModal,
  setSelectedGroup,
  setMembers,
  deleteMember,
  addMember,
} = groupMemberModalSlice.actions;
export default groupMemberModalSlice.reducer;
