package com.travelagencybackend.entities;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseFields {
    @JacksonXmlProperty(isAttribute = true, localName = "FLSOriginCode")
    private String originCode;
    @JacksonXmlProperty(isAttribute = true, localName = "FLSOriginName")
    private String originName;
        @JacksonXmlProperty(isAttribute = true, localName = "FLSDestinationCode")
    private String destinationCode;
    @JacksonXmlProperty(isAttribute = true, localName = "FLSDestinationName")
    private String destinationName;
        @JacksonXmlProperty(isAttribute = true, localName = "FLSStartDate")
    private String startDate;
    @JacksonXmlProperty(isAttribute = true, localName = "FLSEndDate")
    private String endDate;
    @JacksonXmlProperty(isAttribute = true, localName = "FLSResultCount")
    private String resultCount;
    @JacksonXmlProperty(isAttribute = true, localName = "FLSRoutesFound")
    private String routesFound;
    @JacksonXmlProperty(isAttribute = true, localName = "FLSBranchCount")
    private String branchCount;
        @JacksonXmlProperty(isAttribute = true, localName = "FLSTargetCount")
    private String targetCount;
    @JacksonXmlProperty(isAttribute = true, localName = "FLSRecordCount")
    private String recordCount;

}