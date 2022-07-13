import { BigNumber } from 'ethers';
import { Address } from '../types';
import { Web3DomainsV2 } from '../types/contracts/Web3DomainsV2';

export const balanceOf =
  (contract: Web3DomainsV2) =>
  async (address: Address): Promise<BigNumber> => {
    return await contract.balanceOf(address);
  };
