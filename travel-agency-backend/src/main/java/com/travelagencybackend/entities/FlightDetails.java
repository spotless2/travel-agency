package com.travelagencybackend.entities;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightDetails {
    @JacksonXmlProperty(isAttribute = true, localName = "TotalFlightTime")
    private String totalFlightTime;

    @JacksonXmlProperty(isAttribute = true, localName = "TotalMiles")
    private String totalMiles;

    @JacksonXmlProperty(isAttribute = true, localName = "TotalTripTime")
    private String totalTripTime;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDepartureDateTime")
    private String departureDateTime;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDepartureTimeOffset")
    private String departureTimeOffset;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDepartureCode")
    private String departureCode;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDepartureName")
    private String departureName;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSArrivalDateTime")
    private String arrivalDateTime;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSArrivalTimeOffset")
    private String arrivalTimeOffset;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSArrivalCode")
    private String arrivalCode;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSArrivalName")
    private String arrivalName;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSFlightType")
    private String flightType;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSFlightLegs")
    private String flightLegs;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSFlightDays")
    private String flightDays;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDayIndicator")
    private String dayIndicator;

    @JacksonXmlProperty(localName = "FlightLegDetails")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<FlightLegDetails> flightLegDetailsList;

}
