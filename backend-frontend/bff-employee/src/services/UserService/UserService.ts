import {
    GetProfileDto,
    GetUserStatusDto,
    GetUserStatusResp,
    UserCreateResp,
    UserCreateDto,
    UserDto,
    UserBanDto, SearchUsersDto
} from 'dto/User'
import {AuthAPI, CoreAPI, LoanAPI} from "repos/lib";
import {PaginationReq} from "../../dto/Common";
import {GetUserInfoDto} from "../../dto/Account/GetUserInfoDto";
import {Account} from "../../entities/Account";
import {Loan} from "../../entities/Loan";
import {UserAPI} from "../../repos/lib/UserAPI";
import {AccessDto} from "../../dto/User/AccessDto";
import {AuthInfo} from "common/Auth";

class UserService {

    constructor() {

        this.GetProfile = this.GetProfile.bind(this)
        this.GetStatus = this.GetStatus.bind(this)
        this.GetUsers = this.GetUsers.bind(this)
        this.CreateUser = this.CreateUser.bind(this)
        this.BanUser = this.BanUser.bind(this)
        this.GetUserInfo = this.GetUserInfo.bind(this)
        this.GetAccessInfoById = this.GetAccessInfoById.bind(this)
    }

    async GetAccessInfoById(id: string) {
        return (await UserAPI.Req(null).get<AccessDto>(`/public/${id}`)).data
    }

    async GetStatus(Dto: GetUserStatusDto, AuthInfo: AuthInfo) {
        return (await AuthAPI.Req(AuthInfo).get<GetUserStatusResp>('/user/profiles', {params: Dto})).data
    }

    async GetProfile(Dto: GetProfileDto, AuthInfo: AuthInfo) {
        return (
            await AuthAPI.Req(AuthInfo).get<UserDto>('/user/profiles', {
                params: Dto,
            })
        ).data
    }

    async GetUserInfo(Dto: GetUserInfoDto, AuthInfo: AuthInfo) {

        const userRes = await AuthAPI.Req(AuthInfo).get<UserDto[]>(
            '/user/profiles', {
                params: { userIds: [Dto.UserId] }
            })

        const accountsRes = await CoreAPI.Req(AuthInfo).get<Account[]>(
            '/account/employee', {
                params: { userIds: [Dto.UserId] }
            })

        const loansRes = await LoanAPI.Req(AuthInfo).get<Loan[]>(
            '/loan/employee', {
                params: { userIds: [Dto.UserId] }
            })

        const loansRatingRes = await LoanAPI.Req(AuthInfo).get<number>(
            `/loan/employee/rating/${Dto.UserId}`)

        return {
            user: userRes.data[0],
            loanRating: loansRatingRes.data,
            accounts: accountsRes.data,
            loans: loansRes.data
        }

    }

    async GetUsers(Dto: PaginationReq<SearchUsersDto>, AuthInfo: AuthInfo) {
        return (
            await AuthAPI.Req(AuthInfo).get<UserDto[]>('/user/profiles', {
                params: Dto,
            })
        ).data
    }

    async CreateUser(Dto: UserCreateDto, AuthInfo: AuthInfo) {
        return (
            await AuthAPI.Req(AuthInfo).post<UserCreateResp>('/user/create', Dto)
        ).data
    }

    async BanUser(Dto: UserBanDto, AuthInfo: AuthInfo) {
        return (await AuthAPI.Req(AuthInfo).post(`/user/ban/${Dto.UserId}`)).data
    }
}

export default UserService
