package org.example.proyecto_productos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProyectoProductosApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ProyectoProductosApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Hola mundo");
    }
}
