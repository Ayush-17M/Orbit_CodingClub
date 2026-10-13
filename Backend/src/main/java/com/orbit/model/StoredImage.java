package com.orbit.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "stored_images")
public class StoredImage {
	@Id
	private String id;

	private String contentType;
	private Instant createdAt = Instant.now();

	@Lob
	private byte[] data;

	public StoredImage() {}

	public StoredImage(String id, String contentType, byte[] data) {
		this.id = id;
		this.contentType = contentType;
		this.data = data;
	}

	public String getId() {
		return id;
	}

	public String getContentType() {
		return contentType;
	}

	public byte[] getData() {
		return data;
	}
}
