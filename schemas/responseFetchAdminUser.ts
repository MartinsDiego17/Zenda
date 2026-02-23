import { Profile } from "./profile"

export interface PropsFetchAdminUser {
    isUserAdmin: boolean
    user: Profile | null
}