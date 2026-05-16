package com.svalero.agroconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AgroconnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgroconnectApplication.class, args);
	}

}
