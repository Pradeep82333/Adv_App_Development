package com.boat.boat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boat.boat.model.Booking;
import com.boat.boat.repository.BookingRepo;
@Service
public class BookingService {
    @Autowired
	BookingRepo stRepo1;
	
	public Booking saveDetails(Booking e)
	{
		return stRepo1.save(e);
	}
	public List<Booking> getDetails(){
		return stRepo1.findAll();
	}
	public Booking updateDetails (Booking e1) {
		return stRepo1.saveAndFlush(e1);
	}
	public void deleteDetails(int id) {
		stRepo1.deleteById(id);
	}
}
