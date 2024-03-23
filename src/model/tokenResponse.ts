
export interface TokensResponse {
    data: Token[];
}

export interface TokenResponse {
    data: Token;
}

export interface Token {
    id: string;
    type: string;
    attributes: TokenAttributes;
    relationships?: Relationships | null;
}

export interface TokenAttributes {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
    totalSupply?: string | null;
    coingeckoCoinId?: string | null;
    priceUsd?: string | null;
    fdvUsd?: string | null;
    totalReserveInUsd?: string | null;
    volumeUsd?: VolumeUsd | null;
    marketCapUsd?: string | null;
}

export interface VolumeUsd {
    h24: string;
}

export interface Relationships {
    topPools: TopPools;
}

export interface TopPools {
    data: Data[];
}

export interface Data {
    id: string;
    type: string;
}