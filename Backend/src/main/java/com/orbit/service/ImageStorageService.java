package com.orbit.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.orbit.model.StoredImage;
import com.orbit.repo.StoredImageRepository;

@Service
public class ImageStorageService {
	private static final Map<String, String> TYPES = Map.of(
			"image/png", "png",
			"image/jpeg", "jpg",
			"image/webp", "webp",
			"image/gif", "gif");

	private final StoredImageRepository images;

	public ImageStorageService(StoredImageRepository images) {
		this.images = images;
	}

	public String store(MultipartFile file) throws IOException {
		if (file == null || file.isEmpty()) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "No file uploaded.");
		}

		String contentType = file.getContentType();
		if (contentType == null || !TYPES.containsKey(contentType)) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Only PNG, JPEG, WEBP, and GIF images are allowed.");
		}

		byte[] data = file.getBytes();
		if (!looksLikeImage(data)) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "File content is not a valid image.");
		}

		String id = UUID.randomUUID().toString();
		images.save(new StoredImage(id, contentType, data));
		return "/api/images/" + id;
	}

	public StoredImage get(String id) {
		return images.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Image not found."));
	}

	public void delete(String id) {
		if (!images.existsById(id)) {
			throw new ApiException(HttpStatus.NOT_FOUND, "Image not found.");
		}
		images.deleteById(id);
	}

	private boolean looksLikeImage(byte[] data) {
		if (data.length < 12) {
			return false;
		}

		boolean png = (data[0] & 0xFF) == 0x89 && data[1] == 'P'
				&& data[2] == 'N' && data[3] == 'G';
		boolean jpeg = (data[0] & 0xFF) == 0xFF && (data[1] & 0xFF) == 0xD8;
		boolean gif = data[0] == 'G' && data[1] == 'I' && data[2] == 'F' && data[3] == '8';
		boolean webp = new String(data, 0, 4, StandardCharsets.US_ASCII).equals("RIFF")
				&& new String(data, 8, 4, StandardCharsets.US_ASCII).equals("WEBP");

		return png || jpeg || gif || webp;
	}
}
