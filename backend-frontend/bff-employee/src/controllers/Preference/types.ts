import { Request } from 'express'
import {UpdateThemeDto} from "../../dto/Preference";

export type GetThemeReq = Request<any>

export type UpdateThemeReq = Request<{}, {}, UpdateThemeDto>