package com.svalero.agroconnect.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Permitimos el LOGIN y rutas de auth a cualquiera
                        .requestMatchers("/auth/**").permitAll()

                        // Permitimos el REGISTRO (POST) a cualquiera
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/users").permitAll()

                        //Damos acceso a todos
                        .requestMatchers("/products/**").permitAll()
                        .requestMatchers("/joboffers/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/joboffers/**").permitAll()

                        // Bloqueamos el resto de /users (GET, DELETE, PUT) solo para ADMIN
                        // Ojo: requiere que tu token JWT incluya el rol "ADMIN"
                        .requestMatchers("/users/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    // Configuración detallada de CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // El origen de tu React
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        // Métodos permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Cabeceras permitidas (IMPORTANTE incluir Authorization)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

