package com.boot.controller;
import com.boot.dto.SpaceMarine;
import com.boot.repository.SpaceMarineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spacemarines")
public class SpaceMarineController {

    private final SpaceMarineRepo spaceMarineRepository;

    @Autowired
    public SpaceMarineController(SpaceMarineRepo spaceMarineRepository) {
        this.spaceMarineRepository = spaceMarineRepository;
    }

    @GetMapping
    public List<SpaceMarine> getAllSpaceMarines() {
        return spaceMarineRepository.findAll();
    }

    @GetMapping("/{id}")
    public SpaceMarine getSpaceMarineById(@PathVariable Long id) {
        return spaceMarineRepository.findById(id).orElse(null);
    }

    @PostMapping
    public SpaceMarine createSpaceMarine(@RequestBody SpaceMarine spaceMarine) {
        return spaceMarineRepository.save(spaceMarine);
    }

    @PutMapping("/{id}")
    public SpaceMarine updateSpaceMarine(@PathVariable Long id, @RequestBody SpaceMarine newSpaceMarine) {
        return spaceMarineRepository.findById(id)
                .map(existingSpaceMarine -> {
                    // Обновление полей существующего SpaceMarine
                    existingSpaceMarine.setName(newSpaceMarine.getName());
                    existingSpaceMarine.setCoordinates(newSpaceMarine.getCoordinates());
                    existingSpaceMarine.setCreationDate(newSpaceMarine.getCreationDate());
                    existingSpaceMarine.setHealth(newSpaceMarine.getHealth());
                    existingSpaceMarine.setLoyal(newSpaceMarine.isLoyal());
                    existingSpaceMarine.setHeight(newSpaceMarine.getHeight());
                    existingSpaceMarine.setMeleeWeapon(newSpaceMarine.getMeleeWeapon());
                    existingSpaceMarine.setChapter(newSpaceMarine.getChapter());
                    return spaceMarineRepository.save(existingSpaceMarine);
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteSpaceMarine(@PathVariable Long id) {
        spaceMarineRepository.deleteById(id);
    }
}