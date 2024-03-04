import axios from "axios";
import { AuthData, HeaderName } from "config/Auth";
import { AUTH_URL, CORE_URL, LOAN_URL, OPERATION_URL } from "config/URL";

export class Req {
    private static _Auth = axios.create({ baseURL: AUTH_URL })
    private static _Core = axios.create({ baseURL: CORE_URL })
    private static _Loan = axios.create({ baseURL: LOAN_URL })
    private static _Operation = axios.create({ baseURL: OPERATION_URL })

    public static get Auth() {
        this._Auth.defaults.headers[HeaderName] = AuthData.Header
        return this._Auth;
    }

    public static get Core() {
        this._Core.defaults.headers[HeaderName] = AuthData.Header
        return this._Core;
    }

    public static get Loan() {
        this._Loan.defaults.headers[HeaderName] = AuthData.Header
        return this._Loan;
    }

    public static get Operation() {
        this._Operation.defaults.headers[HeaderName] = AuthData.Header
        return this._Operation;
    }
}