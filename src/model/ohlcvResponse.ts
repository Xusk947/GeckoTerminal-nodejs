export interface OhlcvAttributes {
  ohlcvList: Array<Array<number>>;
}

export interface OhlcvList {
  id: string;
  type: string;
  attributes: OhlcvAttributes;
}

export interface OhlcvResponse {
  data: OhlcvList;
}
