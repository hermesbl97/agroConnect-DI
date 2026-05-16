package com.svalero.agroconnect.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationModifyInDto {
    private String state;
    private LocalDate registerDate;
    private long userId;
    private long jobOfferId;
}
