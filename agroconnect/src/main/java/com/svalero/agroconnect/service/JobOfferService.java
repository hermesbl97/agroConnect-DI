package com.svalero.agroconnect.service;

import com.svalero.agroconnect.domain.JobOffer;
import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.dtos.JobOfferInDto;
import com.svalero.agroconnect.dtos.JobOfferModifyInDto;
import com.svalero.agroconnect.exception.JobOfferNotFoundException;
import com.svalero.agroconnect.repository.JobOfferRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobOfferService {

    @Autowired
    private JobOfferRepository jobOfferRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<JobOffer> findAll() {
        return jobOfferRepository.findAll();
    }

    public JobOffer findById(long id) throws JobOfferNotFoundException {
        JobOffer jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(JobOfferNotFoundException::new);

        return jobOffer;
    }

    public JobOffer add(JobOfferInDto jobOfferInDto, User creator) {

        JobOffer newJobOffer = new JobOffer();
        newJobOffer.setCreator(creator);

        modelMapper.map(jobOfferInDto, newJobOffer);
        return jobOfferRepository.save(newJobOffer);
    }

    public JobOffer modify(long id , JobOfferModifyInDto jobOfferInDto, User creator)
            throws JobOfferNotFoundException {

        JobOffer existingJobOffer = jobOfferRepository.findById(id)
                .orElseThrow(JobOfferNotFoundException::new);

        modelMapper.map(jobOfferInDto, existingJobOffer);
        existingJobOffer.setId(id);
        existingJobOffer.setCreator(creator);

        return jobOfferRepository.save(existingJobOffer);
    }

    public void delete(long id) throws JobOfferNotFoundException {
        JobOffer jobOffer = jobOfferRepository.findById(id)
                        .orElseThrow(JobOfferNotFoundException::new);

        jobOfferRepository.delete(jobOffer);
    }
}
