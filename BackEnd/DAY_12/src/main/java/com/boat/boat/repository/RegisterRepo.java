package com.boat.boat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boat.boat.model.Register;

public interface RegisterRepo extends JpaRepository <Register, Long> {
    Register findByEmailAndPassword(String email, String password);
    Register findByEmail(String email);
}
