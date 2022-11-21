import { Hashtag as pHashtag } from '@prisma/client';

class Hashtag {
  public hashtagId: bigint;
  public name: string;
  constructor(hashtagId: bigint, name: string) {
    this.hashtagId = hashtagId;
    this.name = name;
  }

  static of(record: pHashtag) {
    return new Hashtag(record.hashtag_id, record.name);
  }
}

export default Hashtag;
