# Astar Web3 Domains TS
![npm](https://img.shields.io/npm/v/astrdomaints-ethers)
![npm](https://img.shields.io/npm/dm/astrdomaints-ethers?color=green)
![GitHub top language](https://img.shields.io/github/languages/top/masafumimori/astrdomaints-ethers)

Nodejs SDK for interacting with astr domains

Npm: https://www.npmjs.com/package/astrdomaints-ethers

Github: https://github.com/masafumimori/astrdomaints-ethers

## Installation

```shell
npm install astrdomaints-ethers
yarn add astrdomaints-ethers
```

## Usage

```typescript
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import { getAstrDomainSDK, ConfigType } from 'astrdomaints-ethers';

// this is optional
const config: ConfigType = {
  testnet: {
    rpcUrl: undefined,
    contractAddress: undefined,
  },
  mainnet: {
    rpcUrl: 'https://rpc.astar.network:8545',
    contractAddress: '0xA1019535E6b364523949EaF45F4B17521c1cb074',
  },
  defaultNetwork: 'mainnet',
};

export const AstarDomain = () => {
  const [domain, setDomain] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const load = async () => {
      const sdk = await getAstrDomainSDK(config);

      const domain = await sdk.getDomain('0x...');
      setEns(domain ?? '');

      const ownerInfo = await sdk.getOwner({ domain });
      setOwner(ownerInfo.owner);
    };
    load();
  }, [account]);

  return (
    <>
      <p>{domain || `No Astar domain detected`}</p>
      <p>{owner || `No Owner found`}</p>
    </>
  );
};
```

Other available methods can be found in the `src/methods` directory.
