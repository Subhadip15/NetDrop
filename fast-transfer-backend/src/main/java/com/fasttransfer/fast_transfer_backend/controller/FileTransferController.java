package com.fasttransfer.fast_transfer_backend.controller;

import com.fasttransfer.fast_transfer_backend.service.DiskStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FileTransferController {

    private final DiskStorageService storageService;

    // Spring automatically injects the DiskStorageService here
    public FileTransferController(DiskStorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> fastUpload(HttpServletRequest request, @RequestHeader("File-Name") String fileName) {
        try (InputStream inputStream = request.getInputStream()) {
            storageService.saveRawStream(inputStream, fileName);
            return ResponseEntity.ok("Transfer Complete");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload Failed: " + e.getMessage());
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<String>> listFiles() {
        try {
            return ResponseEntity.ok(storageService.listAvailableFiles());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Resource resource = storageService.loadFileAsResource(fileName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    // Add this endpoint to trigger the wipe
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearSession() {
        try {
            storageService.clearAllFiles();
            return ResponseEntity.ok("Session Cleared");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to clear session");
        }
    }
}