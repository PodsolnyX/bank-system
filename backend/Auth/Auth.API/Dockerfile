FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Auth/Auth.API/Auth.API.csproj", "Auth/Auth.API/"]
COPY ["Auth/Auth.BLL/Auth.BLL.csproj", "Auth/Auth.BLL/"]
COPY ["Common/Common.DataTransfer/Common.DataTransfer.csproj", "Common/Common.DataTransfer/"]
RUN dotnet restore "Auth/Auth.API/Auth.API.csproj"
COPY . .
WORKDIR "/src/Auth/Auth.API"
RUN dotnet build "Auth.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Auth.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Auth.API.dll"]
