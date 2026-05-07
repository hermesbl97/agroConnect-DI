package com.svalero.agroconnect.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "joboffers")
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String title;
    @Column
    private String description;
    @Column
    private String location;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column
    private float salary;
    @Column
    private boolean state = true;

    @OneToMany(mappedBy = "jobOffer", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<Application> applications;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;
}
