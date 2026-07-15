export default interface PortalInterface {
  logo: string;
  primary_color: string;
  passkit_faq_url_ios: string;
  passkit_faq_url_android: string;
  has_access_clubs?: boolean;
  has_access_about_membership?: boolean;
  has_access_profile?: boolean;
  has_access_referrals?: boolean;
  has_access_offers?: boolean;
  has_access_visiting_family_membership?: boolean;
  has_access_password_change?: boolean;
  has_access_contact_us?: boolean;
  has_access_all_clubs?: boolean;
  passkit_button_on_top?: boolean;
  contact_us_page?: string;
  referrals_page?: string;
  referrals_page_img?: string;
  terms_and_conditions_url?: string;
  faq_page_url?: string;
  club_guide_url?: string;
  whatsapp_url: string;
}
