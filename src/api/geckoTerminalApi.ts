import {
  DexResponse,
  GeckoTerminalError,
  NetworkResponse,
  PoolResponse,
  SimpleTokenPriceResponse,
  TokensResponse,
} from '../model';

export class GeckoTerminalApi {
  private baseUrl: String = 'https://api.geckoterminal.com/api/v2';

  constructor() {}

  /**
   * Get the simple token price response.
   *
   * @param {string} network - the network id from /networks list (Example: eth)
   * @param {string} address - comma-separated list of token addresses (up to 30 addresses). Addresses not found in the GeckoTerminal database will be ignored. Example: 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2,0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
   * @return {Promise<SimpleTokenPriceResponse>} the token price response promise
   */
  public async getSimple(
    network: string,
    address: string,
  ): Promise<SimpleTokenPriceResponse> {
    return this.get<SimpleTokenPriceResponse>(
      `/simple/networks/${network}/token_price/${address}`,
    );
  }

  /**
   * A description of the entire function.
   *
   * @param {number} page - page through results
   * @return {Promise<NetworkResponse>} get list of supported networks
   */
  public getNetworks(page: number = 1): Promise<NetworkResponse> {
    return this.get<NetworkResponse>(`/networks`);
  }

  /**
   * getDexes
   */
  public getDexes(network: string, integer: number = 1): Promise<DexResponse> {
    return this.get<DexResponse>(`/dexes/${network}?page=${integer}`);
  }

  /**
   * getTrendingPools
   */
  public getTrendingPools(
    include: string | string[] | null = null,
    page: number = 1,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl + `/networks/trending_pools?${this.getQueryString(include)}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getTrendingPoolsByNetwork
   */
  public getTrendingPoolsOnNetwork(
    network: string,
    include: string | string[] | null = null,
    page: number = 1,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/trending_pools?${this.getQueryString(include)}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getSpecificPool
   */
  public getSpecificPool(
    network: string,
    address: string,
    include: string | string[] | null = null,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/pools/${address}?${this.getQueryString(include)}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getMultiplePoolsOnNetwork
   */
  public getMultiplePoolsOnNetwork(
    network: string,
    address: string,
    include: string | string[] | null = null,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/pools/multi/${address}?${this.getQueryString(
        include,
      )}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * GetTopPools
   */
  public getTopPools(
    network: string,
    include: string | string[] | null = null,
    page: number = 1,
    sort: PoolSortOptions = PoolSortOptions.h24_tx_count_desc,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/pools?${this.getQueryString(
        include,
      )}&page=${page}&sort=${sort}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * GetTopPoolsOnNetworkDex
   */
  public getTopPoolsOnNetworkDex(
    network: string,
    dex: string,
    include: string | string[] | null = null,
    page: number = 1,
    sort: PoolSortOptions = PoolSortOptions.h24_tx_count_desc,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/dexes/${dex}/pools?${this.getQueryString(
        include,
      )}&page=${page}&sort=${sort}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getNewPools
   */
  public getNewPoolsOnNetwork(
    network: string,
    include: string | string[] | null = null,
    page: number = 1,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/pools/new?${this.getQueryString(
        include,
      )}&page=${page}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getNewPools
   */
  public getNewPools(
    include: string | string[] | null = null,
    page: number = 1,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl + `/pools/new?${this.getQueryString(include)}&page=${page}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * searchForPoolsOnNetwork
   */
  public searchForPoolsOnNetwork(
    query: string,
    network: string,
    include: string | string[] | null = null,
    page: number = 1,
  ): Promise<PoolResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/pools/search/${query}?${this.getQueryString(
        include,
      )}&page=${page}`;

    return this.get<PoolResponse>(fullUrl);
  }

  // ---------- TOKENS

  // TODO: add support for Tokens and finish it

  /**
   * getTopPoolsForToken
   */
  public getTopPoolsForToken(
    network: string,
    token_address: string,
    include: string | string[] | null = null,
    page: number = 1,
    sort: TokenSortOptions = TokenSortOptions.h24_tx_count_desc,
  ): Promise<TokensResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/tokens/${token_address}/pools?${this.getQueryString(
        include,
      )}&page=${page}&sort=${sort}`;

    return this.get<TokensResponse>(fullUrl);
  }

  /**
   * getSpecificTokenOnNetwork
   */
  public getSpecificTokenOnNetwork(
    network: string,
    address: string,
    include: string | string[] | null = null,
  ): Promise<TokensResponse> {
    const fullUrl =
      this.baseUrl +
      `/networks/${network}/tokens/${address}?${this.getQueryString(include)}`;

    return this.get<TokensResponse>(fullUrl);
  }

  private getQueryString(include: string | string[] | null) {
    const params: { [key: string]: string } = {};

    if (typeof include === 'string') {
      params['include'] = include;
    } else if (Array.isArray(include)) {
      params['include'] = include.join(',');
    } else {
      params['include'] = '';
    }

    const queryString = new URLSearchParams(params).toString();

    return queryString ? `?${queryString}` : '';
  }

  private async get<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(this.baseUrl + path, init);
    if (!res.ok) {
      throw new GeckoTerminalError(res);
    }
    return res.json() as T;
  }
}

export enum PoolSortOptions {
  h24_tx_count_desc,
  h24_volume_usd_desc,
}

export enum TokenSortOptions {
  h24_volume_usd_liquidity_desc,
  h24_tx_count_desc,
  h24_volume_usd_desc,
}
