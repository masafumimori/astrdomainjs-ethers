import { balanceOf, getDomain, getDomains, getMetadata, getMetadatas, getOwner, hashname } from '../methods';
import { AstarDomainSDK, ConfigType } from '../types';
import { Web3DomainsV2 } from '../types/contracts';
import { defaultConfig } from '../utils/defaults';
import { Contract, providers } from 'ethers';
import { abi } from '../../contracts/Web3DomainsV2.json';

export const getAstrDomainSDK = async (options?: ConfigType): Promise<AstarDomainSDK> => {
  const _config = options || defaultConfig;

  const { rpcUrl, contractAddress } = _config.defaultNetwork == 'mainnet' ? _config.mainnet : _config.testnet;

  if (!rpcUrl || !contractAddress) {
    throw new Error('Both rpcUrl and contractAddress must be provided');
  }

  const provider = new providers.JsonRpcProvider(rpcUrl);

  const signer = provider.getSigner('0x5be02bCFE218f33DD7Fa93EBb5791e925ae7b473');

  const contract = new Contract(contractAddress, abi, signer) as Web3DomainsV2;

  return {
    balanceOf: balanceOf(contract),
    getOwner: getOwner(contract),
    getDomain: getDomain(contract),
    getDomains: getDomains(contract),
    getMetadata: getMetadata(contract),
    getMetadatas: getMetadatas(contract),
    hashname: hashname(contract),
  };
};
