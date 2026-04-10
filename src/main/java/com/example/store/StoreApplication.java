package com.example.store;

import com.example.store.model.Product;
import com.example.store.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class StoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(StoreApplication.class, args);
    }

    @Bean
    public CommandLineRunner dataLoader(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                    createProduct("四代练习生T恤", "官方周边男女同款短袖", 129.0, 50),
                    createProduct("限量海报套装", "包含8张不同造型海报", 89.0, 30),
                    createProduct("练习生棒球帽", "刺绣logo，优质棉料", 79.0, 40),
                    createProduct("官方徽章组", "5枚金属徽章精装盒", 59.0, 25)
                ));
            }
        };
    }

    private Product createProduct(String name, String description, double price, int stock) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        return product;
    }
}
