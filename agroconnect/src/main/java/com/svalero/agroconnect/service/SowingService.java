package com.svalero.agroconnect.service;

import com.svalero.agroconnect.domain.Product;
import com.svalero.agroconnect.domain.Sowing;
import com.svalero.agroconnect.domain.User;
import com.svalero.agroconnect.dtos.SowingInDto;
import com.svalero.agroconnect.dtos.SowingModifyInDto;
import com.svalero.agroconnect.exception.SowingNotFoundException;
import com.svalero.agroconnect.repository.SowingRepository;
import com.svalero.agroconnect.util.DateUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SowingService {

    @Autowired
    private SowingRepository sowingRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<Sowing> findAll(String username) {
        List<Sowing> allSowings;

        if (username != null && !username.isEmpty()) {
            allSowings = sowingRepository.findByUserUsername(username);
        } else {
            allSowings = sowingRepository.findAll();
        }
        return allSowings;
    }

    public Sowing findById(long id) throws SowingNotFoundException {
        return sowingRepository.findById(id)
                .orElseThrow(SowingNotFoundException::new);
    }

    public Sowing add(SowingInDto sowingInDto, long collectingDays, long germinationDays, Product product, User user) {
        Sowing newSowing = new Sowing();
        modelMapper.map(sowingInDto, newSowing);
        newSowing.setCollectionDate(DateUtil.getFutureDate(sowingInDto.getSowingDate(),collectingDays));
        newSowing.setGerminationDate(DateUtil.getFutureDate(sowingInDto.getSowingDate(),germinationDays));
        newSowing.setUser(user);
        newSowing.setProduct(product);

        return sowingRepository.save(newSowing);
    }

    public Sowing modify(SowingModifyInDto sowingInDto, long id, long collectingDays, long germinationDays, Product product, User user)
            throws SowingNotFoundException {

        Sowing existingSowing = sowingRepository.findById(id)
                .orElseThrow(SowingNotFoundException::new);

        modelMapper.map(sowingInDto, existingSowing);
        existingSowing.setCollectionDate(DateUtil.getFutureDate(sowingInDto.getSowingDate(),collectingDays));
        existingSowing.setGerminationDate(DateUtil.getFutureDate(sowingInDto.getSowingDate(),germinationDays));
        existingSowing.setUser(user);
        existingSowing.setProduct(product);

        return sowingRepository.save(existingSowing);
    }

    public void delete(long id) throws SowingNotFoundException {
        Sowing sowing = sowingRepository.findById(id)
                .orElseThrow(SowingNotFoundException::new);

        sowingRepository.delete(sowing);
    }

    @Scheduled(cron = "0 0 2 * * *") //cada dia a las dos se actualizará. Si se ha alcanzado la fecha de germinación cambiará el estado
    public void updateGerminatedPlantations() {
        List<Sowing> sowings = sowingRepository.findAll();

        for (Sowing sow : sowings) {
            if (sow.getState().equals("Plantado") && LocalDate.now().isEqual(sow.getGerminationDate())) {
                sow.setState("Ha germinado");
                sowingRepository.save(sow);
            }
        }
    }
}
