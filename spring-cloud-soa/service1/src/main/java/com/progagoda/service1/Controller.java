package com.progagoda.service1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/main")
public class Controller {
    @GetMapping("/hi")
    public String all(){
        return "HI";
    }
}
