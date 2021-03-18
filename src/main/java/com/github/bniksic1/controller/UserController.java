package com.github.bniksic1.controller;

import com.github.bniksic1.domain.User;
import com.github.bniksic1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("/plan")
    public ResponseEntity<String> updateUserPlan(@RequestBody User user){
        userService.updateUserPlanById(user);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
//
//    @GetMapping("{username}")
//    public ResponseEntity<Optional<User>> getUserByUsername(@PathVariable("username") String username){
//        return new ResponseEntity<>(userService.getUserByUsernameOrEmail(username, username), HttpStatus.OK);
//    }
}
