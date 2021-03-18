package com.github.bniksic1.controller;

import com.github.bniksic1.domain.Plan;
import com.github.bniksic1.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/plan")
@CrossOrigin("*")
public class PlanController {
    @Autowired
    private PlanService planService;

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans(){
        return new ResponseEntity<>(planService.getAllPlans(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Plan> addNewPlan(@RequestBody Plan plan){
        return new ResponseEntity<>(planService.addOrUpdatePlan(plan), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Plan> updatePlan(@RequestBody Plan plan){
        return new ResponseEntity<>(planService.addOrUpdatePlan(plan), HttpStatus.OK);
    }
}
