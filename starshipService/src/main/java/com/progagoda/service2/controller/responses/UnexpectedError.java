package com.progagoda.service2.controller.responses;


import com.progagoda.service2.domain.XMLResponse;
import lombok.Data;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "UnexpectedError")
@XmlAccessorType(XmlAccessType.FIELD)
@Data
public class UnexpectedError implements XMLResponse {
    private Integer code;
    private String msg;
    public UnexpectedError(){}
    public UnexpectedError(String msg){
        this.msg = msg;
        this.code = 400;
    }

    public UnexpectedError(int i, String s) {
        this.code = i;
        this.msg = s;
    }

    @Override
    public Integer getStatus() {
        return this.code;
    }
}
