export interface DexResponse {
  data: Dex[];
}

export interface Dex {
  id: string;
  type: string;
  attributes: DexAttributes;
}

export interface DexAttributes {
  name: string;
}
