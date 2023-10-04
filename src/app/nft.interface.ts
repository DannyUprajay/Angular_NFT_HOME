export interface NftInterface {
  id: number,
  name: string,
  pathImage: string,
  price: number,
  user: NftUser,
  // date: any
  category: NftCategory
}

export interface NftUser {
  username: string;
  profilPicture: string;
}

export interface NftCategory {
  label: string;
}

