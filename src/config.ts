const required = (key: string, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value === null || value === undefined) {
    throw new Error(`Key ${key} is undefined`);
  }

  return value;
};

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
  },
  swagger: {
    user: required('SWAGGER_USER'),
    password: required('SWAGGER_PASSWORD'),
  },
};
