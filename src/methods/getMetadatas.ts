import { MetaData } from '../types';
import { Web3DomainsV2 } from '../types/contracts';
import { defaultKeys } from '../utils/defaults';

export type GetMetadatasProps = {
  keys: typeof defaultKeys[number][];
  domain: string;
};

export const getMetadatas =
  (contract: Web3DomainsV2) =>
  async ({ keys, domain }: GetMetadatasProps): Promise<MetaData[]> => {
    const tokenId = await contract.genTokenId(domain);
    const values = await contract.getMany(keys, tokenId);

    const metadatas: MetaData[] = keys.map((key, idx) => ({
      key,
      value: values[idx],
    }));

    return metadatas;
  };
