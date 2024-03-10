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
import {PaginationReq, WithUser} from "../../dto/Common";
import {GetUserInfoDto} from "../../dto/Account/GetUserInfoDto";
import {Account} from "../../entities/Account";
import {Loan} from "../../entities/Loan";

class UserService {

    constructor() {

        this.GetProfile = this.GetProfile.bind(this)
        this.GetStatus = this.GetStatus.bind(this)
        this.GetUsers = this.GetUsers.bind(this)
        this.CreateUser = this.CreateUser.bind(this)
        this.BanUser = this.BanUser.bind(this)
        this.GetUserInfo = this.GetUserInfo.bind(this)
    }

    async GetStatus(Dto: GetUserStatusDto) {
        return (await AuthAPI.Req.get<GetUserStatusResp>('/auth/user', {params: Dto})).data
    }

    async GetProfile(Dto: GetProfileDto) {
        return (
            await AuthAPI.Req.get<UserDto>('/auth/user', {
                params: Dto,
            })
        ).data
    }

    async GetUserInfo(Dto: WithUser<GetUserInfoDto>) {

        const userRes = await AuthAPI.Req.get<UserDto[]>(
            '/auth/employee', {
                params: { userIds: [Dto.UserId] }
            })

        const accountsRes = await CoreAPI.Req.get<Account[]>(
            '/account/employee', {
                params: { userIds: [Dto.UserId] }
            })

        const loansRes = await LoanAPI.Req.get<Loan[]>(
            '/loan/employee', {
                params: { userIds: [Dto.UserId] }
            })

        return {
            user: userRes.data[0],
            accounts: accountsRes.data,
            loans: loansRes.data
        }

    }

    async GetUsers(Dto: WithUser<PaginationReq<SearchUsersDto>>) {
        return (
            await AuthAPI.Req.get<UserDto[]>('/auth/employee', {
                params: Dto,
            })
        ).data
    }

    async CreateUser(Dto: UserCreateDto) {
        return (
            await AuthAPI.Req.post<UserCreateResp>('/auth/employee', Dto)
        ).data
    }

    async BanUser(Dto: UserBanDto) {
        return (await AuthAPI.Req.post(`/auth/employee/${Dto.UserId}`)).data
    }
}

export default UserService
