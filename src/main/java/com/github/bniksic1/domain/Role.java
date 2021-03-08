package com.github.bniksic1.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tbl_role")
public class Role {
    @Id
    @GeneratedValue
    @Column(updatable = false)
    private Integer id;

    @Column(unique=true, nullable = false)
    private String name;
}
