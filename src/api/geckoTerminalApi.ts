import {
  DexResponse,
  GeckoTerminalError,
  NetworkResponse,
  PoolResponse,
  SimpleTokenPriceResponse,
  TokenInfo,
  TokenResponse,
  TokensInfo,
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
    return this.get<DexResponse>(`/networks/${network}/dexes?page=${integer}`);
  }

  /**
   * getTrendingPools
   */
  public getTrendingPools(
    include: string | string[] | null = null,
    page: number = 1,
  ): Promise<PoolResponse> {
    const fullUrl = `/networks/trending_pools${this.getQueryString(include)}`;
    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getTrendingPoolsByNetwork
   */
  public getTrendingPoolsOnNetwork(
    network: string,
    page: number = 1,
    include: string | string[] | null = null,
  ): Promise<PoolResponse> {
    const fullUrl = `/networks/${network}/trending_pools${this.getQueryString(
      include,
    )}`;

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
    const fullUrl = `/networks/${network}/pools/${address}${this.getQueryString(
      include,
    )}`;

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
    const fullUrl = `/networks/${network}/pools/multi/${address}${this.getQueryString(
      include,
    )}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * GetTopPools
   */
  public getTopPools(
    network: string,
    page: number = 1,
    include: string | string[] | null = null,
    sort: PoolSortOptions = PoolSortOptions.h24_tx_count_desc,
  ): Promise<PoolResponse> {
    const fullUrl = `/networks/${network}/pools${this.getQueryStringWithPageAndPoolSort(
      page,
      sort,
      include,
    )}`;
    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * GetTopPoolsOnNetworkDex
   */
  public getTopPoolsOnNetworkDex(
    network: string,
    dex: string,
    page: number = 1,
    include: string | string[] | null = null,
    sort: PoolSortOptions = PoolSortOptions.h24_tx_count_desc,
  ): Promise<PoolResponse> {
    const fullUrl = `/networks/${network}/dexes/${dex}/pools${this.getQueryStringWithPageAndPoolSort(
      page,
      sort,
      include,
    )}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getNewPools
   */
  public getNewPoolsOnNetwork(
    network: string,
    page: number = 1,
    include: string | string[] | null = null,
  ): Promise<PoolResponse> {
    const fullUrl = `/networks/${network}/new_pools${this.getQueryStingWithPage(
      page,
      include,
    )}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * getNewPools
   */
  public getNewPools(
    page: number = 1,
    include: string | string[] | null = null,
  ): Promise<PoolResponse> {
    const fullUrl = `/networks/new_pools${this.getQueryStingWithPage(
      page,
      include,
    )}`;

    return this.get<PoolResponse>(fullUrl);
  }

  /**
   * searchForPoolsOnNetwork
   */
  public searchForPoolsOnNetwork(
    query: string,
    network: string | null = null,
    page: number = 1,
    include: string | string[] | null = null,
  ): Promise<PoolResponse> {
    const fullUrl = `/search/pools${this.getQuerySearch(
      query,
      page,
      network,
      include,
    )}`;

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
    page: number = 1,
    include: string | string[] | null = null,
    sort: TokenSortOptions = TokenSortOptions.h24_tx_count_desc,
  ): Promise<TokensInfo> {
    const fullUrl = `/networks/${network}/tokens/${token_address}/pools${this.getQueryStringWithPageAndTokenSort(
      page,
      sort,
      include,
    )}`;

    return this.get<TokensInfo>(fullUrl);
  }

  /**
   * getSpecificTokenOnNetwork
   */
  public getSpecificTokenOnNetwork(
    network: string,
    address: string,
    include: string | string[] | null = null,
  ): Promise<TokensResponse> {
    const fullUrl = `/networks/${network}/tokens/${address}${this.getQueryString(
      include,
    )}`;

    return this.get<TokensResponse>(fullUrl);
  }

  /**
   * Generates a query string for searching in the GeckoTerminal API.
   *
   * @param {string} query - Search query: can be pool address, token address, or token symbol.
   * @param {number} [page=1] - Page number for pagination.
   * @param {string | null} [network=null] - Network id from /networks list.
   * @param {string | string[] | null} [include=null] - Attributes for related resources to include, which will be returned under the top-level "included" key.
   * @return {string} Matching pools.
   */
  private getQuerySearch(
    query: string,
    page: number = 1,
    network: string | null = null,
    include: string | string[] | null = null,
  ) {
    // out like this: https://api.geckoterminal.com/api/v2/search/pools?query=ETH&network=eth&include=base_token&page=1
    network = network ? `&network=${network}` : '';
    include = include ? `&include=${include}` : '';

    return `?query=${query}${network}${include}&page=${page}`;
  }

  private getQueryStingWithPage(
    page: number = 1,
    include: string | string[] | null = null,
  ) {
    if (!include) {
      return `?page=${page}`;
    }
    return this.getQueryString(include) + `&page=${page}`;
  }

  private getQueryStringWithPageAndPoolSort(
    page: number = 1,
    sort: PoolSortOptions = PoolSortOptions.h24_tx_count_desc,
    include: string | string[] | null = null,
  ) {
    if (!include) {
      return `?page=${page}&sort=${sort.toString()}`;
    }
    return this.getQueryString(include) + `&page=${page}&sort=${sort}`;
  }
  private getQueryStringWithPageAndTokenSort(
    page: number = 1,
    sort: TokenSortOptions = TokenSortOptions.h24_tx_count_desc,
    include: string | string[] | null = null,
  ) {
    if (!include) {
      return `?page=${page}&sort=${sort.toString()}`;
    }
    return this.getQueryString(include) + `&page=${page}&sort=${sort}`;
  }
  private getQueryString(include: string | string[] | null) {
    if (!include) {
      return '';
    }
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
    console.log(this.baseUrl + path);
    const res = await fetch(this.baseUrl + path, init);
    if (!res.ok) {
      throw new GeckoTerminalError(res);
    }

    return res.json() as T;
  }
}

export enum PoolSortOptions {
  h24_tx_count_desc = 'h24_tx_count_desc',
  h24_volume_usd_desc = 'h24_volume_usd_desc',
}

export enum TokenSortOptions {
  h24_volume_usd_liquidity_desc = 'h24_volume_usd_liquidity_desc',
  h24_tx_count_desc = 'h24_tx_count_desc',
  h24_volume_usd_desc = 'h24_volume_usd_desc',
}
