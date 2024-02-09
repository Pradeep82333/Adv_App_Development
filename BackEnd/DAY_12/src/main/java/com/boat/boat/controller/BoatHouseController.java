package com.boat.boat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.boat.boat.model.BoatHouse;
import com.boat.boat.service.BoatHouseService;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
public class BoatHouseController {

    @Autowired
    private BoatHouseService boatHouseService;

    @GetMapping("/api/boatHouses")
    public List<BoatHouse> getAllBoatHouses() {
        return boatHouseService.getAllBoatHouses();
    }

    @GetMapping("/api/boatHouses/{id}")
    public ResponseEntity<BoatHouse> getBoatHouseById(@PathVariable Long id) {
        Optional<BoatHouse> boatHouse = boatHouseService.getBoatHouseById(id);
        return boatHouse.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/boatHouses")
    public ResponseEntity<BoatHouse> createBoatHouse(@RequestBody BoatHouse boatHouse) {
        BoatHouse savedBoatHouse = boatHouseService.createBoatHouse(boatHouse);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBoatHouse);
    }

    @PutMapping("/api/boatHouses/{id}")
    public ResponseEntity<BoatHouse> updateBoatHouse(@PathVariable Long id, @RequestBody BoatHouse updatedBoatHouse) {
        BoatHouse savedBoatHouse = boatHouseService.updateBoatHouse(id, updatedBoatHouse);
        return ResponseEntity.ok(savedBoatHouse);
    }

    @DeleteMapping("/api/boatHouses/{id}")
    public ResponseEntity<Void> deleteBoatHouse(@PathVariable Long id) {
        boatHouseService.deleteBoatHouse(id);
        return ResponseEntity.noContent().build();
    }
}

