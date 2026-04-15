package com.example.store.controller;

import com.example.store.model.CartItem;
import com.example.store.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getCart(@PathVariable Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        
        List<Map<String, Object>> result = cartItems.stream().map(item -> {
            Map<String, Object> cartItem = new HashMap<>();
            cartItem.put("id", item.getId());
            cartItem.put("quantity", item.getQuantity());
            
            if (item.getProduct() != null) {
                Map<String, Object> product = new HashMap<>();
                product.put("id", item.getProduct().getId());
                product.put("name", item.getProduct().getName());
                product.put("price", item.getProduct().getPrice());
                product.put("description", item.getProduct().getDescription());
                cartItem.put("product", product);
            }
            
            return cartItem;
        }).toList();
        
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem cartItem) {
        try {
            CartItem savedItem = cartItemRepository.save(cartItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateQuantity(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(id);
        if (optionalCartItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        CartItem cartItem = optionalCartItem.get();
        Integer quantity = body.get("quantity");
        if (quantity == null || quantity < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        Map<String, Object> response = new HashMap<>();
        response.put("id", cartItem.getId());
        response.put("quantity", cartItem.getQuantity());
        if (cartItem.getProduct() != null) {
            Map<String, Object> product = new HashMap<>();
            product.put("id", cartItem.getProduct().getId());
            product.put("name", cartItem.getProduct().getName());
            product.put("price", cartItem.getProduct().getPrice());
            product.put("description", cartItem.getProduct().getDescription());
            response.put("product", product);
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
        try {
            cartItemRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}