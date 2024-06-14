export enum EUserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted'
}

export interface IUser  {
    userId: string,
    email: string,
    password: string,
    status: EUserStatus
    created: Date
}
