package com.github.bniksic1.service;

import com.github.bniksic1.domain.Role;
import com.github.bniksic1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role getRoleByName(String name){
        return roleRepository.getFirstByNameContainingIgnoreCase(name);
    }
}
