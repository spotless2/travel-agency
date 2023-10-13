package com.travelagencybackend.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.travelagencybackend.entities.Flights;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping(value = "/flights", method = RequestMethod.GET)
@CrossOrigin("http://localhost:4200") // Adjust this based on your frontend's origin
public class FlightController {

    @GetMapping
    public ResponseEntity<Flights> getFlights(
            @RequestParam("departure") String departureCode,
            @RequestParam("destination") String destinationCode,
            @RequestParam("date") String date
    ) {
        // Parse the input date using DateTimeFormatter
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, inputFormatter);

        // Format the date to the desired output format
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String outputDate = localDate.format(outputFormatter);
        try {
            String apiUrl = "https://timetable-lookup.p.rapidapi.com/TimeTable/"
                    + departureCode + "/" + destinationCode + "/" + outputDate + "/";

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-RapidAPI-Key", "b96f0ff58bmsh62d010f70f3f8d7p1db77djsn009fb38cb794");
            headers.set("X-RapidAPI-Host", "timetable-lookup.p.rapidapi.com");

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .headers(
                            "X-RapidAPI-Key", "b96f0ff58bmsh62d010f70f3f8d7p1db77djsn009fb38cb794",
                            "X-RapidAPI-Host", "timetable-lookup.p.rapidapi.com"
                    )
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();

            // Use XmlMapper to parse the responseBody into a List<Flights>
            XmlMapper xmlMapper = new XmlMapper();
            Flights flightsList = xmlMapper.readValue(responseBody, new TypeReference<Flights>() {});

            // Now flightsList contains the parsed response
            return ResponseEntity.ok(flightsList);
        } catch (HttpClientErrorException e) {
            // Handle error response if needed
            return ResponseEntity.status(e.getStatusCode()).build();
        } catch (Exception e) {
            // Handle other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}