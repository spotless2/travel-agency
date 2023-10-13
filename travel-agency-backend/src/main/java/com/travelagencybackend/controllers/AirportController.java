package com.travelagencybackend.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelagencybackend.entities.Airport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
public class AirportController {

    @GetMapping("/airports")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Airport>> getAirports(@RequestParam("q") String query,
                                                     @RequestParam("limit") int limit) {
        HttpClient httpClient = HttpClient.newHttpClient();

        String apiUrl = "https://aerodatabox.p.rapidapi.com/airports/search/term";
        String queryString = String.format("?q=%s&limit=%d", query, limit);
        String requestUrl = apiUrl + queryString;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(requestUrl))
                .header("X-RapidAPI-Key", "b96f0ff58bmsh62d010f70f3f8d7p1db77djsn009fb38cb794")
                .header("X-RapidAPI-Host", "aerodatabox.p.rapidapi.com")
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseNode = objectMapper.readTree(responseBody);
            List<Airport> airports = objectMapper.convertValue(responseNode.get("items"), new TypeReference<List<Airport>>() {});

            return ResponseEntity.ok().body(airports);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return ResponseEntity.badRequest().build();
    }
}
