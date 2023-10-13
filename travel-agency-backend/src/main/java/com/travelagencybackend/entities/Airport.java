package com.travelagencybackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Airport {
    private String name;
    private String icao;
    private String iata;
    private Location location;
    private String shortName;
    private String municipalityName;
    private String countryCode;


    @Override
    public String toString() {
        return "Airport{" +
                "name='" + name + '\'' +
                ", icao='" + icao + '\'' +
                ", iata='" + iata + '\'' +
                ", location=" + location +
                ", shortName='" + shortName + '\'' +
                ", municipalityName='" + municipalityName + '\'' +
                ", countryCode='" + countryCode + '\'' +
                '}';
    }
}