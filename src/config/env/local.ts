const {
  DB_DEV,
  DB_HOST_DEV,
  DB_PORT_DEV,
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  PASS_SWAGGER,
  JWT_SECRET,
  URI_NEARBY_SEARCH,
  KEY_GOOGLE
} = process.env;

export default () => ({
  DB_DEV,
  DB_HOST_DEV,
  DB_PORT_DEV,
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  PASS_SWAGGER,
  JWT_SECRET,
  URI_NEARBY_SEARCH,
  KEY_GOOGLE
});