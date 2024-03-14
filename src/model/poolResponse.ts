export interface PoolResponse {
    data: Pool[];
}

export interface PoolDetailResponse {
    data: Pool;
}

export interface Pool {
    id: string;
    type: string;
    attributes: PoolAttributes;
    relationships?: Relationships | null;
}

export interface PoolAttributes {
    name: string;
    address: string;
    base_token_price_usd?: string | null;
    quote_token_price_usd?: string | null;
    base_token_price_native_currency?: string | null;
    quote_token_price_native_currency?: string | null;
    base_token_price_quote_token?: string | null;
    quote_token_price_base_token?: string | null;
    pool_created_at?: string | null;
    reserve_in_usd?: string | null;
    fdv_usd?: string | null;
    market_cap_usd?: string | null;
    price_change_percentage: Map<string, string | null> | null;
    transactions: Map<string, Map<string, number | null>> | null;
    volume_usd: Map<string, string | null> | null;
}

interface Relationships {
    base_token: Data | null;
    quote_token: Data | null;
    network: Data | null;
    dex: Data | null;
}

interface Data {
    data: Token | null;
}

interface Token {
    id: string;
    type: string;
}