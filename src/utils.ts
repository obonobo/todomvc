const assetPrefix = process.env.ASSET_PREFIX || "";
const urlFor = (path = "/"): string => `${assetPrefix}${path}`;
const redirect = (path = "/"): void =>
  window?.location?.replace(`${assetPrefix}${path}`);

export { assetPrefix, redirect, urlFor };
