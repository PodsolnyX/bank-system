FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AuthorizationServer/AuthorizationServer.API/AuthorizationServer.API.csproj", "AuthorizationServer/AuthorizationServer.API/"]
COPY ["AuthorizationServer/AuthorizationServer.BLL/AuthorizationServer.BLL.csproj", "AuthorizationServer/AuthorizationServer.BLL/"]
RUN dotnet restore "AuthorizationServer/AuthorizationServer.API/AuthorizationServer.API.csproj"
COPY . .
WORKDIR "/src/AuthorizationServer/AuthorizationServer.API"
RUN dotnet build "AuthorizationServer.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "AuthorizationServer.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuthorizationServer.API.dll"]
