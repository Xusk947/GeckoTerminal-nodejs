export interface TradeAttributes {
  block_number: number;
  block_timestamp: string;
  tx_hash: string;
  tx_from_address: string;
  from_token_amount: string;
  to_token_amount: string;
  price_from_in_currency_token: string;
  price_to_in_currency_token: string;
  price_from_in_usd: string;
  price_to_in_usd: string;
  kind: string;
  volume_in_usd: string;
  from_token_address: string;
  to_token_address: string;
}

export interface Trade {
  id: string;
  type: string;
  attributes: TradeAttributes;
}

export interface TradesResponse {
  data: Trade[];
}
