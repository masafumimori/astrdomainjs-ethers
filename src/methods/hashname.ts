import { BigNumber } from 'ethers';
import { Web3DomainsV2 } from '../types/contracts';

export const hashname =
  (contract: Web3DomainsV2) =>
  async (domain: string): Promise<BigNumber> => {
    const hash = await contract.genTokenId(domain);
    return hash;
  };
