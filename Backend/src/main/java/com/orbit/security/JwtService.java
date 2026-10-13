package com.orbit.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtService {

  private final SecretKey key;
  private final long expirationMinutes;

  public JwtService(SecretKey key, @Value("${orbit.jwt.expiration-minutes:480}") long expirationMinutes) {
    this.key = key;
    this.expirationMinutes = expirationMinutes;
  }

  public Claims parse(String token) {
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
  }

  public String issue(String login, String role) {
    Instant now = Instant.now();
    return Jwts.builder()
        .subject(login)
        .claim("role", role)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plus(expirationMinutes, ChronoUnit.MINUTES)))
        .signWith(key)
        .compact();
  }

}
