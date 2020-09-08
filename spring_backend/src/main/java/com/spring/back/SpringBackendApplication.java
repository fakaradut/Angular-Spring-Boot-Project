package com.spring.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "controller" })
@EntityScan("model")
@EnableJpaRepositories("repository")
public class SpringBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBackendApplication.class, args);
	}

}
