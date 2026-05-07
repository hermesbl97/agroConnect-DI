package com.svalero.agroconnect.controller;

import com.svalero.agroconnect.domain.LoginRequest;
import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // Para evitar errores de CORS con React
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Buscamos al usuario en la BD
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);

        // Verificamos si existe y si la contraseña coincide (BCrypt hace el match)
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Devolvemos un Token falso y el Rol (suficiente para tu interfaz)
            Map<String, String> response = new HashMap<>();
            response.put("token", "fake-jwt-token-" + user.getUsername());
            response.put("role", user.getRole());
            response.put("userId", String.valueOf(user.getId()));

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }
}
