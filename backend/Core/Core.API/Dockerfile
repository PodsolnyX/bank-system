FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Core/Core.API/Core.API.csproj", "Core/Core.API/"]
COPY ["Common/Common.Enum/Common.Enum.csproj", "Common/Common.Enum/"]
COPY ["Common/Common.DataTransfer/Common.DataTransfer.csproj", "Common/Common.DataTransfer/"]
COPY ["Core/Core.BLL/Core.BLL.csproj", "Core/Core.BLL/"]
COPY ["Core/Core.DAL/Core.DAL.csproj", "Core/Core.DAL/"]
RUN dotnet restore "Core/Core.API/Core.API.csproj"
COPY . .
WORKDIR "/src/Core/Core.API"
RUN dotnet build "Core.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Core.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Core.API.dll"]
