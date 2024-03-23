export interface SimpleTokenPriceResponse {
  data: SimpleTokenPrice;
}

export interface SimpleTokenPrice {
  id: string;
  type: string;
  attributes: {
    token_prices: {
      [key: string]: string;
    };
  };
}
