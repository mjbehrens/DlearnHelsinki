package dlearnhelsinki;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author delma
 */
public class HelloWorldTest {
    
    public HelloWorldTest() {
    }
    
    @Before
    public void setUp() {   
    }
    
    @Test
    public void test() {
        assertEquals(new HelloWorld().helloWorld(), "Hello, World!");
    }
    
}
