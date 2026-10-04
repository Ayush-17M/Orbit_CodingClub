package com.orbit.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbit.model.User;
import com.orbit.repo.UserRepository;
import com.orbit.service.ApiException;

@RestController
@RequestMapping("/api/student")
public class StudentController {
	
	private final UserRepository users;
	
	public StudentController(UserRepository users) {
		this.users = users;
	}
	
	@GetMapping("/me")
	public Map<String, Object> me(Authentication auth) {
		
		User u = users
				.findByLogin(auth.getName())
				.orElseThrow(() -> new ApiException(
						HttpStatus.UNAUTHORIZED, 
						"Account no longer exists."
						));
		
		return Map.of("name", u.getName(), "email", u.getLogin(), "joined", u.getCreatedAt());
		
	}

}
