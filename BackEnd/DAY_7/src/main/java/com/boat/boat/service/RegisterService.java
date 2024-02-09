package com.boat.boat.service;
import com.boat.boat.model.Register;
import com.boat.boat.repository.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterService {
@Autowired
	RegisterRepo stRepo;
	
	public Register saveDetails(Register e)
	{
		return stRepo.save(e);
	}
	public List<Register> getDetails(){
		return stRepo.findAll();
	}
	public Register updateDetails (Register e1) {
		return stRepo.saveAndFlush(e1);
	}
	public void deleteDetails(long id) {
		stRepo.deleteById(id);
	}
	
}
