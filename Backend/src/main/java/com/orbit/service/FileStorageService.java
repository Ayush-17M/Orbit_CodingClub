package com.orbit.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class FileStorageService {
	private static final Map<String, String> TYPES = 
			Map.of("image/png","png","image/jpeg","jpg","image/webp","webp","image/gif","gif");

	private final Path dir;
	
	// Const
	public FileStorageService(@Value("${orbit.upload-dir}") String uploadDir) throws IOException {
		this.dir = Path.of(uploadDir).toAbsolutePath().normalize();
		
		Files.createDirectories(dir);
	}

	public Path dir() {
		return dir;
	}
	
	
	public String store(MultipartFile file) throws IOException {
		if (file == null || file.isEmpty()) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "No file uploaded");
		}
	
		String ext = TYPES.get(file.getContentType());
		
		if(ext == null) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "only PNG, JPEG, WEAP OR GIF images are allowed.");
		}
		
		byte[] head = new byte[12];
		try(InputStream in = file.getInputStream()) {
			if(in.readNBytes(head, 0, 12) < 12) {
				throw new ApiException(HttpStatus.BAD_REQUEST, "File content is not a valid image.");
			}
		}
		
		if(!looksLikeImage(head)) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "File content is not a valid image.");
		}
		
		String name = UUID.randomUUID() + "." + ext;
		try(InputStream in = file.getInputStream()) {
			Files.copy(in, dir.resolve(name));
		}
		
		return "/uploads/" + name;
	}
	
	private boolean looksLikeImage(byte[] b) {
		boolean png = (b[0] & 0xFF) == 0x89 && b[1] == 'P' && b[2] == 'N' && b[3] == 'G';
		boolean jpg = (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8;
		boolean gif = b[0] == 'G' && b[1] == 'I' && b[2] == 'F' && b[3] == '8';
		
		boolean webp = new String(b, 0, 4, StandardCharsets.US_ASCII).equals("RIFF") && new String(b, 8, 4, StandardCharsets.US_ASCII).equals("WEBP");
		
		return png || jpg || gif || webp;
	}
	
}
