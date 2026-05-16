package com.svalero.agroconnect.controller;

import com.svalero.agroconnect.domain.Product;
import com.svalero.agroconnect.domain.Sowing;
import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.dtos.SowingInDto;
import com.svalero.agroconnect.dtos.SowingModifyInDto;
import com.svalero.agroconnect.exception.*;
import com.svalero.agroconnect.service.ProductService;
import com.svalero.agroconnect.service.SowingService;
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
public class SowingController {

    @Autowired
    private SowingService sowingService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;

    @GetMapping("/sowings")
    public ResponseEntity<List<Sowing>> findAll(
            @RequestParam(value = "username", required = false) String username) {

        List<Sowing> allSowings = sowingService.findAll(username);
        return ResponseEntity.ok(allSowings);
    }

    @GetMapping("/sowings/{id}")
    public ResponseEntity<Sowing> findSowingbyId(@PathVariable long id) throws SowingNotFoundException {
        Sowing sowing = sowingService.findById(id);
        return ResponseEntity.ok(sowing);
    }

    @PostMapping("/sowings")
    public ResponseEntity<Sowing> addSowing(@RequestBody SowingInDto sowingInDto)
            throws UserNotFoundException, ProductNotFoundException {

        User user = userService.findById(sowingInDto.getUserId());
        Product product = productService.findById(sowingInDto.getProductId());
        long collectionDays = product.getGrowthEstimatedTime();
        long germinationDays = product.getGerminatedEstimatedTime();

        Sowing newSowing = sowingService.add(sowingInDto, collectionDays, germinationDays, product, user);

        return new ResponseEntity<>(newSowing, HttpStatus.CREATED);
    }

    @PutMapping("/sowings/{id}")
    public ResponseEntity<Sowing> modifySowing(@PathVariable long id, @RequestBody SowingModifyInDto sowingInDto)
            throws SowingNotFoundException, UserNotFoundException, ProductNotFoundException {

        User user = userService.findById(sowingInDto.getUserId());
        Product product = productService.findById(sowingInDto.getProductId());
        long collectionDays = product.getGrowthEstimatedTime();
        long germinationDays = product.getGerminatedEstimatedTime();

        Sowing newSowing = sowingService.modify(sowingInDto, id, collectionDays, germinationDays, product, user);

        return ResponseEntity.ok(newSowing);
    }

    @DeleteMapping("/sowings/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) throws SowingNotFoundException {
        sowingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(SowingNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(Sowing snfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado la plantación");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(UserNotFoundException unfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado el usuario");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(ProductNotFoundException pnfe) {
        ErrorResponse errorResponse = ErrorResponse.notFound("No se ha encontrado el producto");
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
