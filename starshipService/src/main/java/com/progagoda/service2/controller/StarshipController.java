package com.progagoda.service2.controller;

import com.progagoda.service2.controller.responses.UnexpectedError;
import com.progagoda.service2.domain.StarshipRequest;
import com.progagoda.service2.domain.XMLResponse;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.conn.ssl.AllowAllHostnameVerifier;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.xml.bind.JAXBException;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.function.Consumer;

@RestController()
@RequestMapping("/api/v1")
public class StarshipController {

    private String spaceMarineServiceUrl = "https://localhost:8081/api/v1/starship";
    private XMLParser<XMLResponse> xmlResponseParser = new XMLParser();
    private XMLParser<StarshipRequest> xmlStarshipParser = new XMLParser();
    private HttpsURLConnection connection;

    public StarshipController() throws NoSuchAlgorithmException, KeyManagementException {
    }


    TrustManager[] trustAllCerts = new TrustManager[] {
            new X509TrustManager() {
                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
                public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                public void checkServerTrusted(X509Certificate[] certs, String authType) {}
            }
    };


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
    private HttpResponse httpsPutRequest(String inputUrl) throws IOException, NoSuchAlgorithmException, KeyManagementException {
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustAllCerts, null);

        // Создаем HttpClient с отключенной проверкой SSL
        HttpClient client = HttpClients.custom()
                .setSslcontext(sslContext)
                .setSSLHostnameVerifier((hostname, session) -> true)
                .build();
        HttpPut put = new HttpPut(inputUrl);
        put.setHeader("Content-Type", "application/xml");
        HttpResponse response = client.execute(put);
        return response;
    }

    private HttpResponse httpsPostRequest(String inputUrl) throws IOException, KeyManagementException, NoSuchAlgorithmException {
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustAllCerts, null);

        // Создаем HttpClient с отключенной проверкой SSL
        HttpClient client = HttpClients.custom()
                .setSslcontext(sslContext)
                .setSSLHostnameVerifier((hostname, session) -> true)
                .build();
        HttpPost post = new HttpPost(inputUrl);
        post.setHeader("Content-Type", "application/xml");
        HttpResponse response = client.execute(post);
        return response;
    }
    private HttpResponse httpsGetRequest(String inputUrl) throws IOException, NoSuchAlgorithmException, KeyManagementException {
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustAllCerts, null);

        // Создаем HttpClient с отключенной проверкой SSL
        HttpClient client = HttpClients.custom()
                .setSslcontext(sslContext)
                .setSSLHostnameVerifier((hostname, session) -> true)
                .build();
        HttpGet get = new HttpGet(inputUrl);
        get.setHeader("Content-Type", "application/xml");
        HttpResponse response = client.execute(get);
        return response;
    }

    @PostMapping(path="/starships/create/{id}/{name}", produces ={MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> createStarship(@PathVariable("id") Integer id, @PathVariable("name") String name) throws JAXBException, InterruptedException, IOException, NoSuchAlgorithmException, KeyManagementException {
        String responseEntity;
        Integer responseHttpStatusCode;
        String debugMessage = "Debug message: Hi starship with id: " + id + " and name " + name;
        try {
            HttpResponse response = httpsPostRequest(spaceMarineServiceUrl + "/" + id.toString() + "/" + name);
            responseHttpStatusCode = response.getStatusLine().getStatusCode();
            responseEntity = new String(response.getEntity().getContent().readAllBytes());
        } catch (IOException e){
            responseHttpStatusCode = 503;
            responseEntity = xmlResponseParser.convertToXML(new UnexpectedError(500, "Service is unavailable."));
        }

        return ResponseEntity.status(responseHttpStatusCode)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers",
                        "Origin, Content-Type, Accept, Authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .body(responseEntity+debugMessage);
    }

    @GetMapping(path="/starships", produces ={MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> getStarships() throws IOException, InterruptedException, NoSuchAlgorithmException, KeyManagementException, JAXBException {
        String responseEntity;
        Integer responseHttpStatusCode;
        try{
            HttpResponse response = httpsGetRequest(spaceMarineServiceUrl);
            responseHttpStatusCode = response.getStatusLine().getStatusCode();
            responseEntity = new String(response.getEntity().getContent().readAllBytes());
        } catch (IOException e){
            responseHttpStatusCode = 503;
            responseEntity = xmlResponseParser.convertToXML(new UnexpectedError(500, "Service is unavailable."));
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
        System.out.println("test");
        return ResponseEntity.status(HttpStatus.OK)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .build();
    }

    @RequestMapping(path="/starships/{starshipId}/unload/{spaceMarineId}", produces = {MediaType.APPLICATION_XML_VALUE}, method = RequestMethod.PUT)
    public ResponseEntity unload(@PathVariable("starshipId") Integer starshipId, @PathVariable("spaceMarineId") Integer spaceMarineId) throws IOException, InterruptedException {
        String responseEntity;
        Integer responseHttpStatusCode;
        responseEntity = "Ok";
        try{
            System.out.println("test");
            HttpResponse response = httpsPutRequest(spaceMarineServiceUrl + "/" + starshipId.toString() + "/unload/" + spaceMarineId.toString());
            responseHttpStatusCode = response.getStatusLine().getStatusCode();
            if (responseHttpStatusCode != 204){
                responseEntity = "Space marine" + spaceMarineId + " was not on starship " + starshipId;
            }
            System.out.println("test2");
        } catch (IOException e){
            responseHttpStatusCode = 503;
            responseEntity = "Service is not ready to handle requests.\n";
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (KeyManagementException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity
                .status(responseHttpStatusCode)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers",
                        "Origin, Content-Type, Accept, Authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .body(responseEntity);
    }
}
