package com.orbit.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.orbit.model.User;
import com.orbit.repo.SiteContentRepository;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.orbit.repo.UserRepository;
import com.orbit.service.FileStorageService;
import com.orbit.service.SiteService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	private final UserRepository users;
	private final SiteService site;
	private final FileStorageService storage;
	
	public AdminController(UserRepository users, 
			SiteService site,
			SiteContentRepository siteContentRepository, 
			FileStorageService storage) {
		this.users = users;
		this.site = site;
		this.storage = storage;
	}
	
	@PutMapping("/site")
	public JsonNode save(@RequestBody JsonNode doc) {
		return site.save(doc);
	}
	
	@PostMapping("/site/reset")
	public JsonNode reset() {
		return site.reset();
	}
	
	@GetMapping("/stats")
	public Map<String, Object> status(){
		Map<String, Object> m = new LinkedHashMap<>(site.contentStatus());
		
		m.put("students", users.countByRole(User.Role.STUDENT));
		return m;
	}
	
	@PostMapping("/uploads")
    public  Map<String, String> upload(@RequestParam("file") MultipartFile file) throws IOException {
		return Map.of("url", storage.store(file));
	}
	
	
}
