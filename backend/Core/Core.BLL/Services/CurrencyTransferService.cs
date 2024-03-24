using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Common.Enum;
using Core.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Core.BLL.Services;

public class CurrencyTransferService {
    public async Task<int> TransferMoney(CurrencyType fromCurrency, CurrencyType toCurrency, int amount) {
        if (fromCurrency == toCurrency)
            return amount;
        using HttpClient client = new HttpClient();
       
            var stringResponse = await client.GetStringAsync("https://v6.exchangerate-api.com/v6/fec28a804fd42646bb06b88f/latest/USD");
            CurrencyApiDto? response = JsonSerializer.Deserialize<CurrencyApiDto>(stringResponse);
            if (response is not { result: "success" }) 
                throw new InvalidOperationException();
            
            double fromRate = Math.Round(GetConversionRate(fromCurrency, response), 4);
            double toRate = Math.Round(GetConversionRate(toCurrency, response), 4);
            
            double convertedAmount = ((amount/ 100.0) / fromRate) * toRate;
            return (int)(convertedAmount*100);
    }
    static double GetConversionRate(CurrencyType currencyType, CurrencyApiDto currencyData)
    {
        switch (currencyType)
        {
            case CurrencyType.Usd:
                return currencyData.conversion_rates.USD;
            case CurrencyType.Eur:
                return currencyData.conversion_rates.EUR;
            case CurrencyType.Rub:
                return currencyData.conversion_rates.RUB;
            default:
                throw new ArgumentException("Invalid currency type");
        }
    }
}