package com.boat.boat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "registers") // Assuming the table name is "registers"
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Using auto-increment strategy
    private Long id;

    private String email;
    private String username;
    private String password;
    
    // Constructors, getters, and setters
    
    // Default constructor required by JPA
    public Register() {
    }

    // Constructor with parameters
    public Register(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    // Getters and setters for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getters and setters for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getters and setters for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getters and setters for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
