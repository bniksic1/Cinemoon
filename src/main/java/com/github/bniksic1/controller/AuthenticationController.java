package com.github.bniksic1.controller;

import com.github.bniksic1.domain.User;
import com.github.bniksic1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin("*")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @GetMapping(path = "check")
    public ResponseEntity<User> checkLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken)
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping(path = "register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        if(userService.getUserByUsernameOrEmail(user.getUsername(), user.getEmail()).isPresent())
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);

        return new ResponseEntity<>(userService.addNewUser(user), HttpStatus.OK);
    }

    @PostMapping(path = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticateLogin(@RequestBody User user) {
        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                jsonObject.put("name", authentication.getName());

                JSONArray authorities = new JSONArray();
                for(GrantedAuthority authority : authentication.getAuthorities())
                    authorities.put(authority.getAuthority());
                jsonObject.put("authorities", authorities);
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("Exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @PostMapping(path = "logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticateLogout() {
        SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
        try {
            JSONObject jsonObject = new JSONObject().put("message", "Logout successfully");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
