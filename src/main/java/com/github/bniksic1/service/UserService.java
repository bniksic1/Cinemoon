package com.github.bniksic1.service;

import com.github.bniksic1.domain.User;
import com.github.bniksic1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User addOrUpdateUser(User user){
        return userRepository.saveAndFlush(user);
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }
}
