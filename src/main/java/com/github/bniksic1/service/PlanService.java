package com.github.bniksic1.service;

import com.github.bniksic1.domain.Plan;
import com.github.bniksic1.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {
    @Autowired
    private PlanRepository planRepository;

    public List<Plan> getAllPlans(){
        return planRepository.findAll();
    }

    public Plan addNewPlan(Plan plan){
        return planRepository.save(plan);
    }
}
