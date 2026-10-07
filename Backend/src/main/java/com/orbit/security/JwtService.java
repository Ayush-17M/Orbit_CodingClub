package com.orbit.security;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service 
public class JwtService {

  private final SecretKey key;

  public JwtService(SecretKey key) {
    this.key = key;
  }

  public Claims parse(String token) {
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
  }
  

}
