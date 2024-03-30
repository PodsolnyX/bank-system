import {PreferenceService} from "../services/PreferenceService";
import PreferenceController from "../controllers/Preference/PreferenceController";

export const PreferenceInst = new PreferenceService()
export const PreferenceControllerInst = new PreferenceController(
    PreferenceInst
)