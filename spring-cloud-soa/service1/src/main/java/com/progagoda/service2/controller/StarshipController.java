package com.progagoda.service2.controller;

import com.progagoda.service2.domain.StarshipRequest;
import com.progagoda.service2.domain.XMLResponse;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.HttpsURLConnection;
import javax.xml.bind.JAXBException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.function.Consumer;

@RestController()
@RequestMapping("/api/v1")
public class StarshipController {

    private String spaceMarineServiceUrl = "https://localhost:28081/api/v1/starships";
    private XMLParser<XMLResponse> xmlResponseParser = new XMLParser();
    private XMLParser<StarshipRequest> xmlStarshipParser = new XMLParser();
    private HttpsURLConnection connection;

    private static class StreamGobbler implements Runnable {
        private InputStream inputStream;
        private Consumer<String> consumer;

        public StreamGobbler(InputStream inputStream, Consumer<String> consumer) {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }

        @Override
        public void run() {
            new BufferedReader(new InputStreamReader(inputStream)).lines()
                    .forEach(consumer);
        }
    }
    private HttpResponse httpsPutRequest(String inputUrl) throws IOException {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPut put = new HttpPut(inputUrl);
        put.setHeader("Content-Type", "application/xml");
        HttpResponse response = client.execute(put);
        return response;
    }

    private HttpResponse httpsPostRequest(String inputUrl) throws IOException {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(inputUrl);
        post.setHeader("Content-Type", "application/xml");
        HttpResponse response = client.execute(post);
        return response;
    }
    private HttpResponse httpsGetRequest(String inputUrl) throws IOException {
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(inputUrl);
        get.setHeader("Content-Type", "application/xml");
        HttpResponse response = client.execute(get);
        return response;
    }


    @PostMapping(path="/starship/create/{id}/{name}", produces ={MediaType.APPLICATION_XML_VALUE}, consumes = {MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> createStarship(@RequestParam("id") Integer id, @RequestParam("name") String name, @RequestBody StarshipRequest starshipRequest) throws JAXBException, InterruptedException {
        String responseEntity;
        Integer responseHttpStatusCode;
        try {
            HttpResponse response = httpsPostRequest(spaceMarineServiceUrl + "/" + id.toString() + "/" + name);
            responseHttpStatusCode = response.getStatusLine().getStatusCode();
            responseEntity = new String(response.getEntity().getContent().readAllBytes());
        } catch (IOException e){
            responseHttpStatusCode = 503;
            responseEntity = "Service is not ready to handle requests.";
        }
        return ResponseEntity.status(responseHttpStatusCode)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers",
                        "Origin, Content-Type, Accept, Authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .body(responseEntity);
    }

    @GetMapping(path="/starships", produces ={MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> getStarships() throws IOException, InterruptedException {
        String responseEntity;
        Integer responseHttpStatusCode;
        try{
            HttpResponse response = httpsGetRequest(spaceMarineServiceUrl);
            responseHttpStatusCode = response.getStatusLine().getStatusCode();
            responseEntity = new String(response.getEntity().getContent().readAllBytes());
        } catch (IOException e){
            responseHttpStatusCode = 503;
            responseEntity = "Service is not ready to handle requests.";
        }
        return ResponseEntity
                .status(responseHttpStatusCode)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers",
                        "Origin, Content-Type, Accept, Authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .body(responseEntity);
    }

    @RequestMapping(path = "/starship/{starshipId}/unload/{spaceMarineId}", method = {RequestMethod.OPTIONS})
    public ResponseEntity blyadskayaHuinya() {
        return ResponseEntity.status(HttpStatus.OK)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .build();
    }

    @RequestMapping(path="/starship/{starshipId}/unload/{spaceMarineId}", produces = {MediaType.APPLICATION_XML_VALUE}, method = RequestMethod.PUT)
    public ResponseEntity unload(@RequestParam("starshipId") Integer starshipId, @RequestParam("spaceMarineId") Integer spaceMarineId) throws IOException, InterruptedException {
        String responseEntity;
        Integer responseHttpStatusCode;
        try{
            HttpResponse response = httpsPutRequest(spaceMarineServiceUrl + "/" + starshipId.toString() + "/unload/" + spaceMarineId.toString());
            responseHttpStatusCode = response.getStatusLine().getStatusCode();
            if (responseHttpStatusCode != 204){
                responseEntity = new String(response.getEntity().getContent().readAllBytes());
                return ResponseEntity
                        .status(responseHttpStatusCode)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Access-Control-Allow-Headers",
                               "Origin, Content-Type, Accept, Authorization")
                        .header("Access-Control-Allow-Methods",
                                "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                        .body("Space marine" + spaceMarineId + " was not on starship " + starshipId);
            }
        } catch (IOException e){
            responseHttpStatusCode = 503;
            responseEntity = "Service is not ready to handle requests.";
            return ResponseEntity
                    .status(responseHttpStatusCode)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Headers",
                            "Origin, Content-Type, Accept, Authorization")
                    .header("Access-Control-Allow-Methods",
                            "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                    .body(responseEntity);
        }
        return ResponseEntity
                .status(responseHttpStatusCode)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers",
                        "Origin, Content-Type, Accept, Authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .body("Ok");
    }
}
