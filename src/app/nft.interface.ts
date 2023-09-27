export interface NftInterface {
  id: number,
  name: string,
  pathImage: string,
  price: number,
  user: NftUser,
  // date: any
}

export interface NftUser {
  username: string,
}

