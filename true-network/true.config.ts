
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'

// If you are not in a NodeJS environment, please comment the code following code:
import dotenv from 'dotenv'
import { skillSchema, trustSchema, empowerSchema} from "../schemas";

import {repoSchema} from '../schemas'
dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'htk4fZybbpKpYTF4gLyLfYTgfr7rkmK5o89FzZuAuJtaYe9',
    secret: process.env.NEXT_PUBLIC_TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'myApp',
    hash: '0x4cdcd45eddb118b004925fdb7862429abb26948f2597457587e93e577506cc08'
  },
  algorithm: {
    id: 135,
    path: 'acm',
    schemas: [skillSchema, trustSchema, repoSchema, empowerSchema]
  },
}
  