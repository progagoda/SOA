package com.boot.dto;
import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
public class Coordinates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = -246)
    private Long x;

    @Min(value = -67)
    private int y;

    // Конструкторы, геттеры и сеттеры
    // ...

    public Coordinates() {
    }

    public Coordinates(@NotNull @Min(-246) Long x, @Min(-67) int y) {
        this.x = x;
        this.y = y;
    }

    public Long getId() {
        return id;
    }

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
