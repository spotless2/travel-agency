package com.travelagencybackend.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
@RequestMapping(value = "/hotels", method = RequestMethod.GET)
@CrossOrigin("http://localhost:4200") // Adjust this based on your frontend's origin
public class HotelsController{
    @GetMapping
    public ResponseEntity<String> searchHotels (
            @RequestParam String destination,
            @RequestParam String checkIn,
            @RequestParam String checkOut,
            @RequestParam(required = false) Integer pageNumber,
            @RequestParam(required = false) Integer adults,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer rooms,
            @RequestParam(required = false) String currencyCode,
            @RequestParam(required = false) Integer priceMin,
            @RequestParam(required = false) Integer priceMax

    ){
        HttpHeaders headers = new HttpHeaders();
        HttpClient client = HttpClient.newHttpClient();
        headers.set("X-RapidAPI-Key", "b96f0ff58bmsh62d010f70f3f8d7p1db77djsn009fb38cb794");
        headers.set("X-RapidAPI-Host", "tripadvisor16.p.rapidapi.com");
        headers.setContentType(MediaType.APPLICATION_JSON);


        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels")
                .queryParam("geoId", destination)
                .queryParam("checkIn", checkIn)
                .queryParam("checkOut", checkOut);

        if (pageNumber != null) {
            builder.queryParam("pageNumber", pageNumber);
        }
        if (adults != null) {
            builder.queryParam("adults", adults);
        }
        if (sort != null) {
            builder.queryParam("sort", sort);
        }
        if (rooms != null) {
            builder.queryParam("rooms", rooms);
        }
        if (currencyCode != null) {
            builder.queryParam("currencyCode", currencyCode);
        }
        if (priceMin != null) {
            builder.queryParam("priceMin", priceMin);
        }
        if (priceMax != null) {
            builder.queryParam("priceMax", priceMax);
        }

        String url = builder.toUriString();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("X-RapidAPI-Key", "b96f0ff58bmsh62d010f70f3f8d7p1db77djsn009fb38cb794")
                .header("X-RapidAPI-Host", "tripadvisor16.p.rapidapi.com")
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.status(response.statusCode())
                    .headers(new HttpHeaders())
                    .body(response.body());
        } catch (IOException | InterruptedException e) {
            // Handle exception, log error, etc.
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while making the request.");
        }
    }
}
