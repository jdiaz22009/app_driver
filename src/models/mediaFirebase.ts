export interface MediaFirebase{
  id: String,
  profileMedia: ProfileMedia,
  vehiclesMedia: Object
}

export interface ProfileMedia{
  idFront: String,
  idBack: String,
  licenseFront: String,
  licenseBack: String,
  profile: String,
}
