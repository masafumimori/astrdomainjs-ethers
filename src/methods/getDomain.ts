import { Address } from '../types';
import { Web3DomainsV2 } from '../types/contracts';

export const getDomain =
  (contract: Web3DomainsV2) =>
  async (address: Address): Promise<string> => {
    try {
      const defaultDomain = await contract.reverseOf(address);
      return defaultDomain;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        throw new Error('Failed to fetch a default domain');
      }
      return '';
    }
  };
