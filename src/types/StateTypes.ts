export type UserState = {
    username: string;
    accessToken: string;
}
export type Member = {
    member_id: number;
    member_name: string;
}

export type GroupMemberModal = {
    isOpen: boolean;
    members: Member[];
}

export type RootState = {
    user: UserState,
    groupMemberModal: GroupMemberModal
}