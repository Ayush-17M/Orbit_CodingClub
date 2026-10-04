package com.orbit.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="site_content")
public class SiteContent {
	
	@Id
	private Long id;
	private String json;
	private Instant updatedAt = Instant.now();
	
	public SiteContent() {}	
	public SiteContent(Long id, String json) {
		this.id = id;
		this.json = json;
	}
	
	// getter, setter
	public Long getId() {
		return id;
	}
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public Instant getUpdatedAt() {
		return updatedAt;
	}

	
	

}
