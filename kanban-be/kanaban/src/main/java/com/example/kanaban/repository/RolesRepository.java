package com.example.kanaban.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kanaban.entity.Roles;

@Repository
public interface  RolesRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByName(String name);
}
