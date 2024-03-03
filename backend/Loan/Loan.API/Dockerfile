FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Loan/Loan.API/Loan.API.csproj", "Loan/Loan.API/"]
COPY ["Common/Common.Enum/Common.Enum.csproj", "Common/Common.Enum/"]
COPY ["Common/Common.DataTransfer/Common.DataTransfer.csproj", "Common/Common.DataTransfer/"]
COPY ["Loan/Loan.BLL/Loan.BLL.csproj", "Loan/Loan.BLL/"]
RUN dotnet restore "Loan/Loan.API/Loan.API.csproj"
COPY . .
WORKDIR "/src/Loan/Loan.API"
RUN dotnet build "Loan.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Loan.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Loan.API.dll"]
