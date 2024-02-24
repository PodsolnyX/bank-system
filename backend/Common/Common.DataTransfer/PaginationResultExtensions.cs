using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
namespace Common.DataTransfer;

public static class PaginationResultExtensions {
    public static async Task<List<T>> ToPagedList<T>(this IQueryable<T> query, PaginationRequest paginationRequest) {
        var sort = string.IsNullOrEmpty(paginationRequest.OrderBy) ? "Id" : paginationRequest.OrderBy;

        query =
            paginationRequest.SortOrder == SortOrder.Desc
                ? query.OrderByColumnDescending(sort)
                : query.OrderByColumn(sort);
        query = query.Skip(paginationRequest.Offset ?? 0).Take(paginationRequest.Limit ?? 1000);
        
        return await query.ToListAsync();
    }
    
    private static IOrderedQueryable<T> OrderByColumn<T>(this IQueryable<T> source, string columnPath) 
        => source.OrderByColumnUsing(columnPath, "OrderBy");

    private static IOrderedQueryable<T> OrderByColumnDescending<T>(this IQueryable<T> source, string columnPath) 
        => source.OrderByColumnUsing(columnPath, "OrderByDescending");
    private static IOrderedQueryable<T> OrderByColumnUsing<T>(this IQueryable<T> source, string columnPath, string method)
    {
        var parameter = Expression.Parameter(typeof(T), "item");
        var member = columnPath.Split('.')
            .Aggregate((Expression)parameter, Expression.PropertyOrField);
        var keySelector = Expression.Lambda(member, parameter);
        var methodCall = Expression.Call(typeof(Queryable), method, new[] 
                { parameter.Type, member.Type },
            source.Expression, Expression.Quote(keySelector));

        return (IOrderedQueryable<T>)source.Provider.CreateQuery(methodCall);
    }
}