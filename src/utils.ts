const assetPrefix = process.env.ASSET_PREFIX || "";
const urlFor = (path = "/"): string => `${assetPrefix}${path}`;
export default urlFor;
