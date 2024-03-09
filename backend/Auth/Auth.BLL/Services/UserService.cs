using Auth.BLL.DataTransferObjects;
using Auth.DAL;
using Auth.DAL.Entities;
using Common.DataTransfer;
using Common.Exception;
using Microsoft.EntityFrameworkCore;

namespace Auth.BLL.Services;

public class UserService {
    private readonly AuthDbContext _authDbContext;

    public UserService(AuthDbContext authDbContext) {
        _authDbContext = authDbContext;
    }

    public async Task<UserDto> GetUserProfile(string mail) {
        var user = await _authDbContext.Users
            .FirstOrDefaultAsync(u => u.Mail == mail);
        if (user == null)
            throw new NotFoundException("User not found");
        return new UserDto {
            Id = user.Id,
            Mail = user.Mail,
            Name = user.Name,
            IsEmployee = user.IsEmployee,
            BannedAt = user.BannedAt
        };
    }
    public async Task<Guid> Register(UserRegisterDto dto) {
        var user = new User {
            Mail = dto.Mail,
            Name = dto.Name,
            IsEmployee = false,
        };
        await _authDbContext.Users.AddAsync(user);
        await _authDbContext.SaveChangesAsync();
        return user.Id;
    }
    
    public async Task<List<UserDto>> GetUserProfile(SearchUsersEmployeeDto dto) {
        var users = await _authDbContext
            .Users.Where(u=>
                (dto.UserIds.Count == 0 || dto.UserIds.Contains(u.Id))
                && (string.IsNullOrEmpty(dto.Mail) || u.Mail.Contains(dto.Mail))
                && (string.IsNullOrEmpty(dto.Name) || u.Name.Contains(dto.Name))
                && (dto.IsBanned == null || (dto.IsBanned.Value ? u.BannedAt.HasValue : !u.BannedAt.HasValue))
                && (dto.IsEmployee? u.IsEmployee : !u.IsEmployee)
            )
            .ToPagedList(dto);

        return users.Select(user => new UserDto {
                Id = user.Id,
                Mail = user.Mail,
                Name = user.Name,
                IsEmployee = user.IsEmployee,
                BannedAt = user.BannedAt
            }).ToList();
    }
    
    public async Task<Guid> CreateUser(UserCreateDto dto) {    
        var user = new User {
            Mail = dto.Mail,
            Name = dto.Name,
            IsEmployee = dto.IsEmployee,
        };
        await _authDbContext.Users.AddAsync(user);
        await _authDbContext.SaveChangesAsync();
        return user.Id;
    }
    
    public async Task BanUser(Guid id) {    
        var user = await _authDbContext.Users
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            throw new NotFoundException("User not found");
        if (user.BannedAt.HasValue)
            throw new ForbiddenException("Already banned");
        user.BannedAt = DateTime.UtcNow;
         _authDbContext.Update(user);
         await _authDbContext.SaveChangesAsync();
    }
    
}