 package com.orbit.security;
 
import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtService jwt;

  public JwtAuthFilter(JwtService jwt) {
    this.jwt = jwt;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws IOException, ServletException {

    String header = req.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer")) {
      try {
        Claims claims = jwt.parse(header.substring(7));
        
        var auth = new UsernamePasswordAuthenticationToken(claims.getSubject(), null,
            List.of(new SimpleGrantedAuthority("ROLE_" + claims.get("role", String.class))));
        SecurityContextHolder.getContext().setAuthentication(auth);
      } catch (Exception ignored) {

      }
    }

    chain.doFilter(req, res);
  }
}
