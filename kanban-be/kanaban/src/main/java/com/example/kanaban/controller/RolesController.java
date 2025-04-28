package com.example.kanaban.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kanaban.entity.Roles;
import com.example.kanaban.service.RolesService;

@RestController
@RequestMapping("api/roles")
public class RolesController {

    private final RolesService rolesService;

    public RolesController(RolesService rolesService) {
        this.rolesService = rolesService;
    }

    @GetMapping
    public List<Roles> getAllRoles() {
        return rolesService.getAllRoles();
    }

    @GetMapping("/{id}")
    public Optional<Roles> getRoleById(@PathVariable Long id) {
        return rolesService.getRoleById(id);
    }

    @PostMapping
    public Roles createRole(@RequestBody Roles role) {
        return rolesService.createRole(role);
    }

    @PutMapping("/{id}")
    public Roles updateRole(@PathVariable Long id, @RequestBody Roles role) {
        return rolesService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable Long id) {
        rolesService.deleteRole(id);
    }
}
