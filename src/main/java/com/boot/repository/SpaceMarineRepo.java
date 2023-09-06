package com.boot.repository;
import com.boot.dto.SpaceMarine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceMarineRepo extends JpaRepository<SpaceMarine, Long> {
}
