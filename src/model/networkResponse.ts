export interface NetworkResponse {
  data: Network[];
}

export interface Network {
  id: string;
  type: string;
  attributes: NetworkAttributes;
}

export interface NetworkAttributes {
  name: string;
}
