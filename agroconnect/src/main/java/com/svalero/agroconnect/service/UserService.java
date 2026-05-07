package com.svalero.agroconnect.service;

import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.dtos.UserInDto;
import com.svalero.agroconnect.exception.UserNotFoundException;
import com.svalero.agroconnect.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(long id) throws UserNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        return user;
    }

    public User add(UserInDto userInDto) {

        User user = new User();
        modelMapper.map(userInDto, user);

        // Encriptamos antes de guardar
        user.setPassword(passwordEncoder.encode(userInDto.getPassword()));

        return userRepository.save(user);
    }

    public User modify(User newUser, long id) throws UserNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        // Actualizamos los datos de gestión
        user.setUsername(newUser.getUsername());
        user.setName(newUser.getName());
        user.setSurname(newUser.getSurname());
        user.setEmail(newUser.getEmail());
        user.setTelephoneNumber(newUser.getTelephoneNumber());
        user.setRole(newUser.getRole()); // Esto es lo que el admin cambiará

        // Lógica de seguridad para la contraseña
        String passwordEnviada = newUser.getPassword();

        // 1. Si la contraseña viene vacía o nula, no tocamos la que ya hay en la BD
        if (passwordEnviada == null || passwordEnviada.isEmpty()) {
            // No hacemos nada, se queda la que ya tenía 'user'
        }
        // 2. Si la contraseña NO empieza por el prefijo de BCrypt, es que es texto plano
        // (el admin la ha cambiado manualmente o es un registro nuevo)
        else if (!passwordEnviada.startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(passwordEnviada));
        }
        // 3. Si empieza por $2a$, es que el formulario ha enviado el hash original
        // sin cambios, así que no encriptamos de nuevo.
        return userRepository.save(user);
    }

    public void delete(long id) throws UserNotFoundException {
        User user = userRepository.findById(id)
                        .orElseThrow(UserNotFoundException::new);

        userRepository.delete(user);
    }
}
