package com.fasttransfer.fast_transfer_backend.service;


import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class DiskStorageService {

    // Saves files inside an 'uploads' folder in your project root
    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    public DiskStorageService() {
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    // The extreme-fast direct stream write
    public void saveRawStream(InputStream inputStream, String fileName) throws IOException {
        File targetFile = new File(UPLOAD_DIR + File.separator + fileName);
        try (FileOutputStream outputStream = new FileOutputStream(targetFile)) {
            inputStream.transferTo(outputStream);
        }
    }

    public List<String> listAvailableFiles() throws IOException {
        try (Stream<Path> stream = Files.list(Paths.get(UPLOAD_DIR))) {
            return stream.filter(file -> !Files.isDirectory(file))
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
        }
    }

    public Resource loadFileAsResource(String fileName) throws Exception {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return resource;
        } else {
            throw new FileNotFoundException("File not found: " + fileName);
        }
    }
    // Add this method to clear all files for a new session
    public void clearAllFiles() throws IOException {
        try (Stream<Path> stream = Files.list(Paths.get(UPLOAD_DIR))) {
            stream.forEach(file -> {
                try {
                    Files.delete(file);
                } catch (IOException e) {
                    System.err.println("Could not delete file: " + file);
                }
            });
        }
    }
}
