export interface SimpleTokenPriceResponse {
  data: SimpleTokenPrice;
}

/**
 * Represents the structure of a simple token price object.
 *
 * @interface SimpleTokenPrice
 * @property {string} id - The unique identifier of the token price.
 * @property {string} type - The type of the token price.
 * @property {object} attributes - The detailed attributes of the token price.
 * @property {object} attributes.token_prices - The token prices for different keys.
 */
export interface SimpleTokenPrice {
  id: string;
  type: string;
  attributes: {
    token_prices: {
      [key: string]: string;
    };
  };
}
