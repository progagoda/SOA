package com.progagoda.service2.controller;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import java.io.StringWriter;

public class XMLParser<T> {
    public String convertToXML(T resp) throws JAXBException {
        JAXBContext jc = JAXBContext.newInstance(resp.getClass());
        Marshaller marshaller = jc.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        StringWriter sw = new StringWriter();
        marshaller.marshal(resp, sw);
        return sw.toString();
    }
}
