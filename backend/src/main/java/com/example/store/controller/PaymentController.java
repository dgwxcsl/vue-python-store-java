package com.example.store.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping("/checkout")
    public String checkout() {
        // Mock payment processing
        return "Payment successful";
    }
}