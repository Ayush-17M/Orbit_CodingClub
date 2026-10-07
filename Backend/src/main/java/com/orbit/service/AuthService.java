package com.orbit.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.orbit.dto.Dtos.AuthResponse;
import com.orbit.dto.Dtos.RegisterRequest;
import com.orbit.model.User;
import com.orbit.repo.UserRepository;
import com.orbit.security.JwtService;

@Service
public class AuthService {
	
	private final UserRepository users;
	private final PasswordEncoder encoder;
	private final JwtService jwt;
	private final LoginAttemptService attempts;
	
	public AuthService(UserRepository user, PasswordEncoder encoder, JwtService jwt, LoginAttemptService attempts) {
		this.users = user;
		this.encoder = encoder;
		this.jwt = jwt;
		this.attempts = attempts;
	}
	
	public AuthResponse login(String login, String password, User.Role role) {
		
		String normalized = role == User.Role.STUDENT ? login.trim().toLowerCase() : login.trim();
		String key = role + ":" + normalized.toLowerCase();
		
		User u = users.findByLoginAndRole(normalized, role).orElse(null);
		if(u == null || !encoder.matches(password, u.getPassword())) {
			attempts.check(key);
			throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
		}
		
		return toResponse(u);
	}
	
	public AuthResponse registerStudent(RegisterRequest r) {
		String email = r.email().trim().toLowerCase();
		
		if(users.existsByLogin(email)) {
			throw new ApiException(HttpStatus.CONFLICT, "An account with this email already exists.");
		}
		
		User u = new User();
		u.setName(r.name().trim());
		u.setLogin(email);
		u.setPassword(encoder.encode(r.password()));
		u.setRole(User.Role.STUDENT);
		
		users.save(u);
		return toResponse(u);
		
	}
	private AuthResponse toResponse(User u) {
		return new AuthResponse(u.getName(), u.getPassword(),u.getRole().name());
	}
}
