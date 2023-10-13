package com.travelagencybackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightLegDetails {
    @JacksonXmlProperty(isAttribute = true, localName = "DepartureDateTime")
    private String departureDateTime;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDepartureTimeOffset")
    private String departureTimeOffset;

    @JacksonXmlProperty(isAttribute = true, localName = "ArrivalDateTime")
    private String arrivalDateTime;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSArrivalTimeOffset")
    private String arrivalTimeOffset;

    @JacksonXmlProperty(isAttribute = true, localName = "FlightNumber")
    private String flightNumber;

    @JacksonXmlProperty(isAttribute = true, localName = "JourneyDuration")
    private String journeyDuration;

    @JacksonXmlProperty(isAttribute = true, localName = "SequenceNumber")
    private String sequenceNumber;

    @JacksonXmlProperty(isAttribute = true, localName = "LegDistance")
    private String legDistance;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSMeals")
    private String meals;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSInflightServices")
    private String inflightServices;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSUUID")
    private String UUID;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSUUIDActualFlight")
    private String UUIDActualFlight;

    @JacksonXmlProperty(localName = "DepartureAirport")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<DepartureAirport> departureAirportList;

    @JacksonXmlProperty(localName = "ArrivalAirport")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<ArrivalAirport> arrivalAirportList;

    @JacksonXmlProperty(localName = "MarketingAirline")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<MarketingAirline> marketingAirlineList;

    @JacksonXmlProperty(localName = "OperatingAirline")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<OperatingAirline> operatingAirlineList;

    @JacksonXmlProperty(localName = "Equipment")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<Equipment> equipmentList;

}
