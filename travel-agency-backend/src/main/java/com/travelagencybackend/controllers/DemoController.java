package com.travelagencybackend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// Annotation
@Controller
// Main class
public class DemoController {

    @RequestMapping("/test")
    @ResponseBody

    // Method
    public String test()
    {
        return "test controller - success";
    }
}