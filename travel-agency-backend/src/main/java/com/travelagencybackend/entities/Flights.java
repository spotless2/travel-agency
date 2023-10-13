package com.travelagencybackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "OTA_AirDetailsRS", namespace = "http://www.opentravel.org/OTA/2003/05")
public class Flights {
    @JacksonXmlProperty(isAttribute = true, localName = "PrimaryLangID")
    private String primaryLangID;

    @JacksonXmlProperty(isAttribute = true, localName = "Version")
    private String version;

    @JacksonXmlProperty(isAttribute = true, localName = "TransactionIdentifier")
    private String transactionIdentifier;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSNote")
    private String flsNote;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDevice")
    private String flsDevice;
//    @JacksonXmlProperty(localName = "Success")
//    private SuccessClass success;

    @JacksonXmlProperty(localName = "FLSResponseFields")
    @JacksonXmlElementWrapper(useWrapping = false)
    private ResponseFields responseFields;

    @JacksonXmlProperty(localName = "FlightDetails")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<FlightDetails> flightDetailsList;

}
