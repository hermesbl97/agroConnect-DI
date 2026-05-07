package com.svalero.agroconnect.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @Column
    private String ecosystem;
    @Column
    private String season;
    @Column(name = "crop_growth_estimated_time")
    private long growthEstimatedTime;
    @Column(name = "crop_germinated_time")
    private long germinatedEstimatedTime;
    @Column
    private String description;
    @Column(name = "ideal_minimum_temperature")
    private float minTemperature;
    @Column(name = "ideal_maximum_temperature")
    private float maxTemperature;
    @Column
    private float watering;
    @Column
    private float depth;
    @Column(name = "sowing_type")
    private String sowingType;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonBackReference(value = "product-sowings")
    private List<Sowing> sowings;
}
