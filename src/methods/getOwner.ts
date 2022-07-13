import { isAddress } from 'ethers/lib/utils';
import { Address, OwnerInfo } from '../types';
import { Web3DomainsV2 } from '../types/contracts';
import { defaultKeys } from '../utils/defaults';

export type GetOwnerProps = {
  domain: string;
  hasMetadata?: boolean;
};

export const getOwner =
  (contract: Web3DomainsV2) =>
  async ({ domain, hasMetadata = false }: GetOwnerProps): Promise<OwnerInfo> => {
    let metadata: OwnerInfo['metadata'] = [];

    const keys = [...defaultKeys];

    if (hasMetadata) {
      const tokenId = await contract.genTokenId(domain);
      const values = await contract.getMany(keys, tokenId);

      const data: OwnerInfo['metadata'] = keys.map((key, idx) => ({
        key,
        value: values[idx],
      }));

      metadata = data;
    }

    let ownerAddress;
    try {
      ownerAddress = await contract.getOwner(domain);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        throw new Error('Failed to fetch the owner address');
      }
    }

    if (ownerAddress && !isAddress(ownerAddress)) {
      throw new Error('Owner address is invalid');
    }

    const ownerInfo: OwnerInfo = {
      owner: ownerAddress as Address,
      native: '',
      metadata,
    };

    return ownerInfo;
  };
