package com.svalero.agroconnect.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "sowing")
public class Sowing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "sowing_date")
    private LocalDate sowingDate;
    @Column(name = "estimated_collection_date")
    private LocalDate collectionDate;
    @Column(name = "estimated_germination_date")
    private LocalDate germinationDate;
    @Column
    private String state = "Plantado";

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
