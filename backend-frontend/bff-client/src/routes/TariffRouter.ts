import express from 'express'

import { RouterHelper } from './lib'
import { TariffControllerInst } from 'init/Tariff'

const TariffRouter = express.Router()

RouterHelper.use(TariffRouter, TariffControllerInst, [
  {
    method: 'get',
    path: '/',
    handlers: [TariffControllerInst.GetTariffs],
  },
])

export default TariffRouter
