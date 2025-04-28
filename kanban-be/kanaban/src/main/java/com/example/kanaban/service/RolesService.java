package com.example.kanaban.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.kanaban.entity.Permission;
import com.example.kanaban.entity.Roles;
import com.example.kanaban.repository.PermissionRepository;
import com.example.kanaban.repository.RolesRepository;

@Service
public class RolesService {

    private final RolesRepository rolesRepository;
    private final PermissionRepository permissionRepository;

    public RolesService(RolesRepository rolesRepository, PermissionRepository permissionRepository) {
        this.rolesRepository = rolesRepository;
        this.permissionRepository = permissionRepository;
    }

    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }

    public Optional<Roles> getRoleById(Long id) {
        return rolesRepository.findById(id);
    }

    public Optional<Roles> getRoleByName(String name) {
        return rolesRepository.findByName(name);
    }

    public Roles createRole(Roles role) {
        Set<Permission> managedPermissions = new HashSet<>();
    
        for (Permission permission : role.getPermissions()) {
            List<Permission> existingPermissions = permissionRepository.findByResource(permission.getResource());
    
            Optional<Permission> matchedPermission = existingPermissions.stream()
                .filter(p -> p.getActions().equals(permission.getActions()))
                .findFirst();
    
            if (matchedPermission.isPresent()) {
                managedPermissions.add(matchedPermission.get());
            } else {
                Permission savedPermission = permissionRepository.save(permission);
                managedPermissions.add(savedPermission);
            }
        }
    
        role.setPermissions(managedPermissions);
        return rolesRepository.save(role);
    }

    public Roles updateRole(Long id, Roles updatedRole) {
        return rolesRepository.findById(id).map(existingRole -> {
            existingRole.setName(updatedRole.getName());
            existingRole.setPermissions(updatedRole.getPermissions());
            return rolesRepository.save(existingRole);
        }).orElseThrow(() -> new RuntimeException("Role not found"));
    }

    public void deleteRole(Long id) {
        rolesRepository.deleteById(id);
    }
}
