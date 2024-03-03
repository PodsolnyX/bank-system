FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Arbiter/Arbiter.API/Arbiter.API.csproj", "Arbiter/Arbiter.API/"]
COPY ["Arbiter/Arbiter.BLL/Arbiter.BLL.csproj", "Arbiter/Arbiter.BLL/"]
COPY ["Common/Common.Enum/Common.Enum.csproj", "Common/Common.Enum/"]
RUN dotnet restore "Arbiter/Arbiter.API/Arbiter.API.csproj"
COPY . .
WORKDIR "/src/Arbiter/Arbiter.API"
RUN dotnet build "Arbiter.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Arbiter.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Arbiter.API.dll"]
