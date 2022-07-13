import { Address } from '../types';
import { Web3DomainsV2 } from '../types/contracts';

export const getDomains =
  (contract: Web3DomainsV2) =>
  async (address: Address): Promise<string[]> => {
    try {
      const { domains } = await contract.getDomainbyAddress(address);
      return domains;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        throw new Error('Failed to fetch domains');
      }
    }
    return [];
  };
