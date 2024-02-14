package com.boat.boat.controller;


import com.boat.boat.model.Register;
import com.boat.boat.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin
public class RegisterController {
    @Autowired
    RegisterService stuService;
   
    @GetMapping("fetch")
    public List<Register> fetchDetails(){
        return stuService.getDetails();
    }
    @PutMapping("/update")
    public Register updateInfo (@RequestBody Register st1 ) {
        return stuService.updateDetails(st1);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteInfo(@PathVariable("id") int id) {
        stuService.deleteDetails(id);
        return "Details deleted success";
    }
   
}
