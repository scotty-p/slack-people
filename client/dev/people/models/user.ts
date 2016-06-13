export class User {
  id: string;
  team_id: string;
  name: string;
  color: string;
  real_name: string;
  deleted: boolean;
  presence:string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  profile: UserProfile;
}

type UserProfile = {
  first_name:string;
  last_name:string;
  skype:string;
  phone:string;
  title:string;
  avatar_hash:string;
  real_name:string;
  real_name_normalized:string;
  email:string;
  image_24:string;
  image_32:string;
  image_48:string;
  image_72:string;
  image_192:string;
  image_512:string;
}
