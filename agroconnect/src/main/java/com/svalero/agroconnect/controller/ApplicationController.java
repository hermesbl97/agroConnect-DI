package com.svalero.agroconnect.controller;

import com.svalero.agroconnect.domain.Application;
import com.svalero.agroconnect.domain.JobOffer;
import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.dtos.ApplicationInDto;
import com.svalero.agroconnect.dtos.ApplicationModifyInDto;
import com.svalero.agroconnect.exception.*;
import com.svalero.agroconnect.service.ApplicationService;
import com.svalero.agroconnect.service.JobOfferService;
import com.svalero.agroconnect.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private JobOfferService jobOfferService;

    @GetMapping("/applications")
    public ResponseEntity<List<Application>> findAll() {
        List<Application> allApplications = applicationService.findAll();

        return ResponseEntity.ok(allApplications);
    }

    @GetMapping("/applications/{id}")
    public ResponseEntity<Application> findApplicationById(@PathVariable long id) throws ApplicationNotFoundException {
        Application application = applicationService.findById(id);
        return ResponseEntity.ok(application);
    }

    @PostMapping("/applications")
    public ResponseEntity<Application> add(@RequestBody ApplicationInDto applicationInDto)
            throws UserNotFoundException, JobOfferNotFoundException {

        User user = userService.findById(applicationInDto.getUserId());
        JobOffer jobOffer = jobOfferService.findById(applicationInDto.getJobOfferId());
        Application newApplication = applicationService.add(user, jobOffer);

        return new ResponseEntity<>(newApplication, HttpStatus.CREATED);
    }

    @PutMapping("/applications/{id}")
    public ResponseEntity<Application> modify(@PathVariable long id, @RequestBody ApplicationModifyInDto applicationInDto)
            throws ApplicationNotFoundException, UserNotFoundException, JobOfferNotFoundException {

        User user = userService.findById(applicationInDto.getUserId());
        JobOffer jobOffer = jobOfferService.findById(applicationInDto.getJobOfferId());

        Application newApplication = applicationService.modify(id, applicationInDto, user, jobOffer);
        return ResponseEntity.ok(newApplication);
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) throws ApplicationNotFoundException {
        applicationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ApplicationNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(ApplicationNotFoundException anfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado la aplicación a la oferta de empleo");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(UserNotFoundException unfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado el usuario");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(JobOfferNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(JobOfferNotFoundException jonfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado la oferta de empleo");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleException(MethodArgumentNotValidException manve) {
        Map<String, String> errors = new HashMap<>();
        //extraemos los errores de la excepción del fallo
        manve.getBindingResult().getAllErrors().forEach(error -> { //para cada error rellenamos el nombre del campo
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName,message); //asociamos cada error con su mensaje
        });
        ErrorResponse errorResponse = ErrorResponse.validationError(errors);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        ErrorResponse errorResponse = ErrorResponse.internalServerError();
        return new ResponseEntity<>(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
