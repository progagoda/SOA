package com.progagoda.service2.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/hello")
public class TestController {
    @GetMapping()
    public String hello(){
        return "Hello, I'm starship service!";
    }
}
