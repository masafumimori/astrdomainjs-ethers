import { MetaData } from '../types';
import { Web3DomainsV2 } from '../types/contracts';
import { defaultKeys } from '../utils/defaults';

export type GetMetadataProps = {
  key: typeof defaultKeys[number];
  domain: string;
};

export const getMetadata =
  (contract: Web3DomainsV2) =>
  async ({ key, domain }: GetMetadataProps): Promise<MetaData> => {
    const tokenId = await contract.genTokenId(domain);
    const value = await contract.get(key, tokenId);

    return {
      key,
      value,
    };
  };
