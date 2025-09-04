
import { getEnvOrThrow } from "../shared/utils/utils";
export const isProduction = getEnvOrThrow('NODE_ENV') === 'production';