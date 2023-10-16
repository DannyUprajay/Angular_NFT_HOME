import {NftInterface} from "./nft.interface";

export interface GalleryInterface {
  id: number
  name: string,
  description: string
  nft: NftInterface[]
}
