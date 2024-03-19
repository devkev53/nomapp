import Jwt from "jsonwebtoken";
const {sign, decode, verify} = Jwt
// import { Jwt } from "jsonwebtoken";

const secret = process.env.SECRET_JWT

export const generate_url_token = (email) => {
  const jwtConfig = {
    expiresIn: '10m',
  };
  const payload = {
    sub: email,
  }
  
  return token = sign(payload, secret, jwtConfig) 
}