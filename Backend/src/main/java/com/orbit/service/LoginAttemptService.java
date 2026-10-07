package com.orbit.service;


import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service 
public class LoginAttemptService {
  private record Entry(int fails, Instant first){}
  private static final int MAX = 5;
  private static final Duration WINDOW = Duration.ofMinutes(15); 
  private final Map<String, Entry> attempts = new ConcurrentHashMap<>();

  public void check(String key) {
    Entry e = attempts.get(key);

    if(e == null) return;

    if(Instant.now().isAfter(e.first().plus(WINDOW))) {
      attempts.remove(key);
      return;
    }

    if(e.fails() >= MAX){
      throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "Too many failed login attempts. Try again in 15 minutes.");
    }
  }

  
}
