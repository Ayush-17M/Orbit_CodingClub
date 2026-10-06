package com.orbit.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.orbit.dto.Dtos.AdminLoginRequest;
import com.orbit.dto.Dtos.RegisterRequest;
import com.orbit.dto.Dtos.StudentLoginRequest;
import com.orbit.model.User;
import com.orbit.service.AuthService;
import com.orbit.dto.Dtos.AuthResponse;


import jakarta.validation.Valid;

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
	
	@PostMapping("/student/login")
	public AuthResponse studentLogin(@Valid @RequestBody StudentLoginRequest r) {
		return auth.login(r.email(), r.password(), User.Role.STUDENT);
	}
	
	@PostMapping("/student/register")
	@ResponseStatus(HttpStatus.CREATED)
	public AuthResponse register(@Valid @RequestBody RegisterRequest r) {
		return auth.registerStudent(r);
	}
	
	
}
