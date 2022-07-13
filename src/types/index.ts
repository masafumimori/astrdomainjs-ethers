import { BigNumber } from 'ethers';
import { GetMetadataProps } from '../methods/getMetadata';
import { GetMetadatasProps } from '../methods/getMetadatas';
import { GetOwnerProps } from '../methods/getOwner';
import { defaultKeys } from '../utils/defaults';

export type Address = `0x${string}`;
export type URL = `https://${string}`;

export type ConfigType = {
  testnet: {
    rpcUrl?: URL;
    contractAddress?: Address;
  };
  mainnet: {
    rpcUrl: URL;
    contractAddress: Address;
  };
  defaultNetwork: 'mainnet' | 'testnet';
};

export type OwnerInfo = {
  owner: Address;
  native: string;
  metadata: MetaData[];
};

export type MetaData = {
  key: typeof defaultKeys[number];
  value: string;
};

export type AstarDomainSDK = {
  balanceOf: (address: Address) => Promise<BigNumber>;
  getOwner: ({ domain, hasMetadata }: GetOwnerProps) => Promise<OwnerInfo>;
  getDomain: (address: Address) => Promise<string>;
  getDomains: (address: Address) => Promise<string[]>;
  getMetadata: ({ key, domain }: GetMetadataProps) => Promise<MetaData>;
  getMetadatas: ({ keys, domain }: GetMetadatasProps) => Promise<MetaData[]>;
  hashname: (domain: string) => Promise<BigNumber>;
};
