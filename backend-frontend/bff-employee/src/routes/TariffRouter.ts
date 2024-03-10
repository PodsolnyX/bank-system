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
  {
    method: 'post',
    path: '/',
    handlers: [TariffControllerInst.CreateTariff],
  },
  {
    method: 'delete',
    path: `/:tariffId`,
    handlers: [TariffControllerInst.DeleteTariff],
  },
])

export default TariffRouter
