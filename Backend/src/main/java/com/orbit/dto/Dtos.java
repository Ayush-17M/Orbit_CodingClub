package com.orbit.dto;

import jakarta.validation.constraints.*;

public class Dtos {
	private Dtos() {}
	
	public record AdminLoginRequest(@NotBlank String username, @NotBlank String password) {}
	
	public record StudentLoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
	
	public record RegisterRequest(
			@NotBlank @Size(max = 100) String name,
			@NotBlank @Email @Size(max = 150) String email,
			@NotBlank @Size(min = 8, max = 100) String password
			) {}
	
	public record AuthResponse(String token, String name, String login, String role) {}
	
	public record JoinRequestDto(
			@NotBlank @Size(max = 100) String name,
            @NotBlank @Email @Size(max = 150) String email,
            @Size(max = 50) String wing,
            @Size(max = 1000) String message) {}
	
}
