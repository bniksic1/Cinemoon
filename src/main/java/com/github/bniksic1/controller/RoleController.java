package com.github.bniksic1.controller;

import com.github.bniksic1.domain.Plan;
import com.github.bniksic1.domain.Role;
import com.github.bniksic1.service.PlanService;
import com.github.bniksic1.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/role")
@CrossOrigin("*")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<List<Role>> getAllPlans(){
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Role> addNewPlan(@RequestBody Role role){
        return new ResponseEntity<>(roleService.addNewRole(role), HttpStatus.OK);
    }
}
