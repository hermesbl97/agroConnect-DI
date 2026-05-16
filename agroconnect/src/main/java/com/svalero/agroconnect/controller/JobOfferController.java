package com.svalero.agroconnect.controller;

import com.svalero.agroconnect.domain.JobOffer;
import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.dtos.JobOfferInDto;
import com.svalero.agroconnect.dtos.JobOfferModifyInDto;
import com.svalero.agroconnect.exception.ErrorResponse;
import com.svalero.agroconnect.exception.JobOfferNotFoundException;
import com.svalero.agroconnect.exception.ProductNotFoundException;
import com.svalero.agroconnect.exception.UserNotFoundException;
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
public class JobOfferController {

    @Autowired
    private JobOfferService jobOfferService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;

    @GetMapping("/joboffers")
    public ResponseEntity<List<JobOffer>> findAll() {
        List<JobOffer> jobOffers = jobOfferService.findAll();
        return ResponseEntity.ok(jobOffers);
    }

    //TODO control de errores
    @GetMapping("/joboffers/{id}")
    public ResponseEntity<JobOffer> findJobOfferById(@PathVariable long id) throws JobOfferNotFoundException {
        JobOffer jobOffer = jobOfferService.findById(id);
        return ResponseEntity.ok(jobOffer);
    }

    @PostMapping({"/joboffers", "/joboffers/"})
    public ResponseEntity<JobOffer> add(@RequestBody JobOfferInDto jobOfferInDto)
            throws JobOfferNotFoundException, UserNotFoundException {

        User creator = userService.findById(jobOfferInDto.getCreatorId());
        JobOffer newJobOffer = jobOfferService.add(jobOfferInDto, creator);
        return new ResponseEntity<>(newJobOffer, HttpStatus.CREATED);
    }

    @PutMapping("/joboffers/{id}")
    public ResponseEntity<JobOffer> modify(@PathVariable long id, @RequestBody JobOfferModifyInDto jobOfferInDto)
            throws JobOfferNotFoundException, UserNotFoundException {
        User creator = userService.findById(jobOfferInDto.getCreatorId());

        JobOffer newJobOffer = jobOfferService.modify(id, jobOfferInDto, creator);
        return ResponseEntity.ok(newJobOffer);
    }

    @DeleteMapping("/joboffers/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) throws JobOfferNotFoundException {
        jobOfferService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(JobOfferNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(JobOfferNotFoundException jonfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado la oferta de empleo");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(UserNotFoundException unfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado el usuario");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleException(MethodArgumentNotValidException manve) {
        Map<String, String> errors = new HashMap<>();
        manve.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName,message);
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

