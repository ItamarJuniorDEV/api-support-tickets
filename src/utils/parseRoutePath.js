export function parseRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z0-9_-]+)/g;

  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9_-]{36})");

  const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`);

  return pathRegex;
}
