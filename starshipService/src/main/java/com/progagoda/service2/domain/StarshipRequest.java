package com.progagoda.service2.domain;

import lombok.Data;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="Starship")
@XmlAccessorType(XmlAccessType.FIELD)
@Data
public class StarshipRequest {
    private Integer id;
    private String name;
}
