package com.svalero.agroconnect.repository;

import com.svalero.agroconnect.domain.JobOffer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOfferRepository extends CrudRepository<JobOffer, Long> {

    List<JobOffer> findAll();
}
