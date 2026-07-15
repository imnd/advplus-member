import KidInterface from "./KidInterface";
import CouponInterface from "./CouponInterface";
import SubscriptionDetailInterface from "./SubscriptionDetailInterface";
import PortalInterface from "./PortalInterface";
import VisitingFamilyMembershipInterface from "./VisitingFamilyMembershipInterface";

export interface UserData {
  data: UserInterface
}
export default interface UserInterface {
  member_id: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  recovery_email: string
  start_date: string
  end_date: string
  avatar: string
  dob: string
  phone: string
  pass_url: string
  renewal_url: string
  member_type: string
  membership_type: string
  membership_status: string
  corporate_name: string
  header_logo: string
  header_color: string
  isProcessing?: boolean
  avatar_url: {
    medium: string
  }
  location?: string
  portal?: PortalInterface
  kids?: Array<KidInterface>
  coupon?: CouponInterface
  subscription_detail?: SubscriptionDetailInterface
  visiting_family_membership?: VisitingFamilyMembershipInterface
}

export interface UserAuthInfo {
  errors: unknown
  user: UserInterface
  isAuthenticated: boolean
}
