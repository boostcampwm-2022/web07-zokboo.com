import { Hashtag as pHashtag } from '@prisma/client';

class Hashtag {
  public hashtagId: bigint | undefined;
  public name: string;
  constructor(hashtagId: bigint, name: string) {
    this.hashtagId = hashtagId;
    this.name = name;
  }

  static of(record: pHashtag) {
    return new Hashtag(record.hashtag_id, record.name);
  }

  static new(name: string) {
    return new Hashtag(undefined, name);
  }

  setId(hashtagId: bigint) {
    this.hashtagId = hashtagId;
  }
}

export default Hashtag;
