package com.fasttransfer.fast_transfer_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;

@RestController
@RequestMapping("/api")
public class NetworkController {

    @GetMapping("/ip")
    public ResponseEntity<String> getLocalIp() {
        try {
            // Fetches the laptop's LAN IP address (e.g., 192.168.x.x)
            return ResponseEntity.ok(InetAddress.getLocalHost().getHostAddress());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("127.0.0.1");
        }
    }
}
