FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["OperationHistory/OperationHistory.API/OperationHistory.API.csproj", "OperationHistory/OperationHistory.API/"]
COPY ["Common/Common.DataTransfer/Common.DataTransfer.csproj", "Common/Common.DataTransfer/"]
COPY ["OperationHistory/OperationHistory.BLL/OperationHistory.BLL.csproj", "OperationHistory/OperationHistory.BLL/"]
COPY ["Common/Common.Enum/Common.Enum.csproj", "Common/Common.Enum/"]
RUN dotnet restore "OperationHistory/OperationHistory.API/OperationHistory.API.csproj"
COPY . .
WORKDIR "/src/OperationHistory/OperationHistory.API"
RUN dotnet build "OperationHistory.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "OperationHistory.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OperationHistory.API.dll"]
