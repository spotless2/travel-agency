package com.travelagencybackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArrivalAirport {
    @JacksonXmlProperty(isAttribute = true, localName = "CodeContext")
    private String codeContext;

    @JacksonXmlProperty(isAttribute = true, localName = "LocationCode")
    private String locationCode;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSLocationName")
    private String locationName;

    @JacksonXmlProperty(isAttribute = true, localName = "Terminal")
    private String terminal;

    @JacksonXmlProperty(isAttribute = true, localName = "FLSDayIndicator")
    private String dayIndicator;
}

