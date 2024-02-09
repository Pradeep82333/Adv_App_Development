package com.boat.boat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boat.boat.model.Booking;


public interface BookingRepo extends JpaRepository <Booking, Integer>{
    
}
