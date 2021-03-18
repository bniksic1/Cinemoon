package com.github.bniksic1.service;

import com.github.bniksic1.domain.User;
import com.github.bniksic1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    public Optional<User> getUserByUsernameOrEmail(String username, String email){
        return Optional.ofNullable(userRepository.findFirstByUsernameOrEmail(username, email));
    }

    public User addNewUser(User user){
        user.setRole(roleService.getRoleByName("user"));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.saveAndFlush(user);
    }

    public User updateUser(User user){
        return userRepository.saveAndFlush(user);
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }

    public void updateUserPlanById(User user){
        Integer planId = user.getPlan() == null ? null : user.getPlan().getId();
        userRepository.updateUserPlanById(planId, user.getId());
    }
}
