export function extractQueryParams(query: string): Record<string, string> {
  return query
    .slice(1)
    .split("&")
    .reduce((queryParams: Record<string, string>, params) => {
      const [key, value] = params.split("=");
      queryParams[key] = value;
      return queryParams;
    }, {});
}