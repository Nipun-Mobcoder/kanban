package com.example.kanaban.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/boxes")
public class BoxesController {
    
    @PostMapping()
    public String createBox() {
        return "";
    }
    
}
