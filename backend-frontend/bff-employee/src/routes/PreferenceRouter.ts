import express from 'express'

import { RouterHelper } from './lib'
import {PreferenceControllerInst} from "../init/Preference";

const PreferenceRouter = express.Router()

RouterHelper.use(PreferenceRouter, PreferenceControllerInst, [
  {
    method: 'get',
    path: '/theme',
    handlers: [PreferenceControllerInst.GetTheme],
  },
  {
    method: 'post',
    path: '/theme',
    handlers: [PreferenceControllerInst.UpdateTheme],
  },
])

export default PreferenceRouter
