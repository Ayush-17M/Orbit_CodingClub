package com.orbit.controller;

import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbit.model.StoredImage;
import com.orbit.service.ImageStorageService;

@RestController
@RequestMapping("/api/images")
public class ImageController {
	private final ImageStorageService images;

	public ImageController(ImageStorageService images) {
		this.images = images;
	}

	@GetMapping("/{id}")
	public ResponseEntity<byte[]> get(@PathVariable String id) {
		StoredImage image = images.get(id);
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(image.getContentType()))
				.cacheControl(CacheControl.noCache())
				.body(image.getData());
	}
}
