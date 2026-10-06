package com.orbit.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbit.service.SiteService;


@RestController
public class SiteController {
	private final SiteService site;
	
	public SiteController (SiteService site) {
		this.site = site;
	}
	
	@GetMapping("/api/site")
	public JsonNode get() {
		return site.get();
	}
}
