package com.svalero.agroconnect.repository;


import com.svalero.agroconnect.domain.Sowing;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SowingRepository extends CrudRepository<Sowing, Long>  {

    List<Sowing> findAll();
    List<Sowing> findByUserUsername(String username);
}
