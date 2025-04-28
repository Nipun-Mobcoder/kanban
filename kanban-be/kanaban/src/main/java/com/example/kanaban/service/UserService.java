package com.example.kanaban.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.kanaban.dto.UserRequest;
import com.example.kanaban.entity.Roles;
import com.example.kanaban.entity.User;
import com.example.kanaban.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RolesService rolesService;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, RolesService rolesService) {
        this.userRepository = userRepository;
        this.rolesService = rolesService;
    }

    public User saveUser(UserRequest userRequest) {
        User user = new User();
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setPhone(userRequest.getPhone());

        Set<Roles> managedRoles = userRequest.getRoles().stream()
            .map(roleId -> rolesService.getRoleById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found")))
            .collect(Collectors.toSet());

        user.setRoles(managedRoles);

        return userRepository.save(user);
    }

    public User getUserProfile(String email) {
        if(email == null) {
            throw new RuntimeException("Email is null");
        }
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setPhone(updatedUser.getPhone());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

