package com.example.kanaban.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kanaban.Enums.Resource;
import com.example.kanaban.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    List<Permission> findByResource(Resource resource);
}
