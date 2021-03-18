package com.github.bniksic1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Data
@Entity
@Table(name = "tbl_user")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @Column(updatable = false)
    private Integer id;

    @Column(unique=true, nullable = false)
    private String username;

    private String phoneNumber;

    @Column(unique=true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    public String getUsername() {
        return username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Plan getPlan() {
        return plan;
    }

    public Integer getId() {
        return id;
    }

    public Map<String, Object> toHashMap(){
        Map<String, Object> map = new HashMap<>();
        map.put("id", Long.toString(id));
        map.put("username", getUsername());
        map.put("phoneNumber", getPhoneNumber());
        map.put("email", getEmail());
        map.put("authId", getRole().getId());
        map.put("planId", getPlan().getId());
        return map;
    }
}
