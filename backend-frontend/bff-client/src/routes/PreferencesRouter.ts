import express from 'express'

import { RouterHelper } from './lib'
import { PreferencesControllerInst } from 'init/Preferences'

const PreferencesRouter = express.Router()

RouterHelper.use(PreferencesRouter, PreferencesControllerInst, [
  {
    method: 'get',
    path: '/',
    handlers: [PreferencesControllerInst.GetPreferences],
  },
  {
    method: 'get',
    path: '/theme',
    handlers: [PreferencesControllerInst.GetTheme],
  },
  {
    method: 'get',
    path: '/accounts',
    handlers: [PreferencesControllerInst.GetHiddenAccounts],
  },
  {
    method: 'put',
    path: '/theme',
    handlers: [PreferencesControllerInst.UpdateTheme],
  },
  {
    method: 'put',
    path: '/account/show',
    handlers: [PreferencesControllerInst.ShowAccount],
  },
  {
    method: 'put',
    path: '/account/hide',
    handlers: [PreferencesControllerInst.HideAccount],
  },
])

export default PreferencesRouter
