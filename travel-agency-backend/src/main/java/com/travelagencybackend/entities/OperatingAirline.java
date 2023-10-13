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
public class OperatingAirline {
       @JacksonXmlProperty(isAttribute = true, localName = "Code")
       private String code;
       @JacksonXmlProperty(isAttribute = true, localName = "CodeContext")
       private String Context;
       @JacksonXmlProperty(isAttribute = true, localName = "CompanyShortName")
       private String companyShortName;
       @JacksonXmlProperty(isAttribute = true, localName = "FlightNumber")
       private String flightNumber;

}
