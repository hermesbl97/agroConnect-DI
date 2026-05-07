package com.svalero.agroconnect.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SowingInDto {
    private LocalDate sowingDate;
    private long userId;
    private long productId;
}
