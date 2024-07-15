export type UserState = {
    username: string;
    accessToken: string;
}

export type User = {
    id: number;
    username: string;
}

export type Member = {
    member_id: number;
    member_name: string;
}

export type GroupMemberModal = {
    isOpen: boolean;
    group_id: number;
    members: Member[];
}

export type RootState = {
    user: UserState,
    groupMemberModal: GroupMemberModal
}

export type Invitation = {
    sender_name: string;
    group_id: number;
    group_name: string;
}

export type ReceivedInvitation = {
    group_id: number;
    group_name: string;
}