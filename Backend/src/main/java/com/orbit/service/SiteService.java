package com.orbit.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbit.model.SiteContent;
import com.orbit.repo.SiteContentRepository;

@Service
public class SiteService {

	private static final long ID = 1L;
	private static final int MAX_CHARS = 1_000_000;
	private static final List<String> REQUIRED = List.of("hero", "intro", "wings", "resources", "gallery", "about",
			"contact", "social");

	private final ObjectMapper mapper;
	private final SiteContentRepository repo;

// Const
	public SiteService(ObjectMapper mapper, SiteContentRepository repo) {
		this.mapper = mapper;
		this.repo = repo;
	}

public JsonNode get() {
    return repo.findById(ID)
        .map(c -> {
            String json = c.getJson();
            if (json == null || json.isBlank()) {
                return reset();
            }
            return parse(json);
        })
        .orElseGet(this::reset);
}
	
	
	public JsonNode save(JsonNode doc) {
		validate(doc);
		String json = write(doc);
		if (json.length() > MAX_CHARS)
			throw new ApiException(HttpStatus.PAYLOAD_TOO_LARGE, "Site data is too large.");

		SiteContent c = repo.findById(ID).orElseGet(() -> new SiteContent(ID, json));

		c.setJson(json);
		repo.save(c);
		return doc;
	}

	public JsonNode reset() {
		try (InputStream in = new ClassPathResource("default-site-data.json").getInputStream()) {
			return save(mapper.readTree(in));
		}
		catch(IOException e) {
			throw new IllegalStateException("Cannot load default-site-data.json", e);
		}
	}
	
	public Map<String, Object> contentStatus() {
		JsonNode d = get();
		long events = 0;
		for(JsonNode g: d.path("gallery")) {
			if("EVENTS".equals(g.path("category").asText())) events++;
		}
		Map<String, Object> m = new LinkedHashMap<>();
		m.put("wings", d.path("wings").size());
		m.put("resources", d.path("resources").size());
		m.put("gallery", d.path("gallery").size());
		m.put("events", events);
		
		return m;
	}
	

	// validate method
	private void validate(JsonNode doc) {
		if (doc == null || !doc.isObject())
			bad("Site data must boa JSON object.");

		for (String key : REQUIRED) {
			if (!doc.has(key) || doc.get(key).isNull())
				bad("Missing section: " + key);
		}
		for (String arr : List.of("wings", "resources", "gallery")) {
			if (!doc.get(arr).isArray())
				bad("'" + arr + "' must be a list.");
		}
		for (String obj : List.of("hero", "intro", "about", "contact", "social")) {
			if (!doc.get(obj).isObject())
				bad("'" + obj + "' must be an object.");
		}
		for (JsonNode w : doc.get("wings")) {
			if (w.path("id").asText().isBlank())
				bad("Every wing needs an id.");
		}

		for (JsonNode r : doc.get("resources"))
			checkUrl(r, "url");
		for (JsonNode g : doc.get("gallery"))
			checkUrl(g, "image");
		checkUrl(doc.get("contact"), "mapUrl");
		checkUrl(doc.get("contact"), "mapLink");

		Iterator<String> social = doc.get("social").fieldNames();
		while (social.hasNext())
			checkUrl(doc.get("social"), social.next());
	}

	private void checkUrl(JsonNode r, String field) {
		JsonNode v = r.get(field);
		if (v == null || v.isNull() || v.asText().isBlank()) {
			return;
		}

		String s = v.asText().trim().toLowerCase();
		if (!(s.startsWith("https://") || s.startsWith("/uploads/")))
			bad("Invalid URL in '" + field + "' . Use http(s):// links or an uploaded image.");
	}

	private void bad(String msg) {
		throw new ApiException(HttpStatus.BAD_REQUEST, msg);
	}

	private String write(JsonNode doc) {
		try {
			return mapper.writeValueAsString(doc);
		} catch (JsonProcessingException e) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid JSON.");
		}
	}

	private JsonNode parse(String json) {
		try {
			return mapper.readTree(json);
		} catch (JsonProcessingException e) {
			throw new IllegalStateException("Invalid site JSON stored in database", e);
		}
	}
}
