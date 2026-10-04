package com.orbit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbit.dto.Dtos.StudentLoginRequest;
import com.orbit.model.User;
import com.orbit.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	private final AuthService auth;
	
	public AuthController(AuthService auth) {
		this.auth = auth;
	}

	@PostMapping("/admin/login")
	public AuthResponse adminLogin(@Valid @RequestBody AdminLoginRequest r) {
		return auth.login(r.username(), r.password(), User.Role.ADMIN);
	}
	
	@PostMapping("/student/register")
	pubic AuthResponse register(@Valid @RequestBody RegisterRequest r) {
		return auth.registerStudent(r);
	}
	
	@PostMapping("/student/login")
	public AuthResponse studentLogin(@Valid @RequestBody StudentLoginRequest r) {
		return auth.login(r.email(), r.password(), User.Role.STUDENT);
	}
}
