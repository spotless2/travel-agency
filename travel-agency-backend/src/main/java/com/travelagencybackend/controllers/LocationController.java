package com.travelagencybackend.controllers;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/search-location")
@CrossOrigin(origins = "http://localhost:4200")
public class LocationController {

    @GetMapping
    public ResponseEntity<String> searchLocation(@RequestParam String query) {
        String url = "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=" + query;
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", "b96f0ff58bmsh62d010f70f3f8d7p1db77djsn009fb38cb794");
        headers.set("X-RapidAPI-Host", "tripadvisor16.p.rapidapi.com");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response;
    }
}
