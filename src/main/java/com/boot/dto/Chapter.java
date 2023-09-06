package com.boot.dto;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String parentLegion;

    @NotNull
    private String world;

    // Конструкторы, геттеры и сеттеры
    // ...

    public Chapter() {
    }

    public Chapter(@NotBlank String name, String parentLegion, @NotNull String world) {
        this.name = name;
        this.parentLegion = parentLegion;
        this.world = world;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParentLegion() {
        return parentLegion;
    }

    public void setParentLegion(String parentLegion) {
        this.parentLegion = parentLegion;
    }

    public String getWorld() {
        return world;
    }

    public void setWorld(String world) {
        this.world = world;
    }
}
