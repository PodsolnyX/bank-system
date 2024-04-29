FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Observer/Observer.API/Observer.API.csproj", "Observer/Observer.API/"]
COPY ["Common/Common.Exception/Common.Exception.csproj", "Common/Common.Exception/"]
COPY ["Observer/Observer.BLL/Observer.BLL.csproj", "Observer/Observer.BLL/"]
COPY ["Observer/Observer.DAL/Observer.DAL.csproj", "Observer/Observer.DAL/"]
RUN dotnet restore "Observer/Observer.API/Observer.API.csproj"
COPY . .
WORKDIR "/src/Observer/Observer.API"
RUN dotnet build "Observer.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Observer.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Observer.API.dll"]
