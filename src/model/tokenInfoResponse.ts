
export interface TokenInfo {
    id: string;
    type: string;
    attributes: TokenInfoAttributes;
    relationships?: TokenInfoRelationships | null;
}

export interface TokenInfoAttributes {
    name: string;
    address: string;
    symbol: string;
    coingeckoCoinId?: string | null;
    imageUrl?: string | null;
    websites?: string[] | null;
    description?: string | null;
    discordUrl?: string | null;
    telegramHandle?: string | null;
    twitterHandle?: string | null;
    gtScore?: number | null;
    metadataUpdatedAt?: string | null;
}

export interface TokenInfoRelationships {
    network: TokenInfoData | null;
}

export interface TokenInfoData {
    data: TokenType | null;
}

export interface TokenType {
    id: string;
    type: string;
}

export interface TokensInfoResponse {
    data: TokenInfo[];
}

export interface TokenInfoResponse {
    data: TokenInfo;
}