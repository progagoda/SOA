import controller.StarshipController;
import controller.TestController;
//import org.glassfish.appclient.client.acc.Main;
//import org.glassfish.embeddable.GlassFish;
//import org.glassfish.embeddable.GlassFishException;
//import org.glassfish.embeddable.GlassFishProperties;
//import org.glassfish.embeddable.GlassFishRuntime;

import javax.ws.rs.ApplicationPath;
import java.io.File;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Application;

@ApplicationPath("/api/v1")
public class MyApp extends Application{
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(TestController.class);
        classes.add(StarshipController.class);
        return classes;
    }

}