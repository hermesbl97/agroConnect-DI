package com.svalero.agroconnect.service;

import com.svalero.agroconnect.domain.Application;
import com.svalero.agroconnect.domain.JobOffer;
import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.dtos.ApplicationInDto;
import com.svalero.agroconnect.dtos.ApplicationModifyInDto;
import com.svalero.agroconnect.exception.ApplicationNotFoundException;
import com.svalero.agroconnect.repository.ApplicationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ModelMapper modelMapper;


    public List<Application> findAll() {
        return applicationRepository.findAll();
    }

    public Application findById(long id) throws ApplicationNotFoundException {
        return applicationRepository.findById(id)
                .orElseThrow(ApplicationNotFoundException::new);
    }

    public Application add(User user, JobOffer jobOffer) {

        Application application = new Application();
        application.setUser(user);
        application.setJobOffer(jobOffer);

        return applicationRepository.save(application);
    }

    public Application modify(long id, ApplicationModifyInDto applicationInDto, User user, JobOffer jobOffer)
            throws ApplicationNotFoundException {
        Application existingApplication = applicationRepository.findById(id)
                .orElseThrow(ApplicationNotFoundException::new);

        modelMapper.map(applicationInDto, existingApplication);
        existingApplication.setId(id);
        existingApplication.setUser(user);
        existingApplication.setJobOffer(jobOffer);

        return applicationRepository.save(existingApplication);
    }

    public void delete(long id) throws ApplicationNotFoundException {
        Application application = applicationRepository.findById(id)
                .orElseThrow(ApplicationNotFoundException::new);

        applicationRepository.delete(application);
    }
}
