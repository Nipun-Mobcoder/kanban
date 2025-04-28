package com.example.kanaban.service;

import java.util.Collection;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.kanaban.entity.User;
import com.example.kanaban.repository.UserRepository;
import com.example.kanaban.util.JwtUtil;

@Service
public class UserDetailsServiceImpl implements  UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public UserDetailsServiceImpl(UserRepository userRepository, JwtUtil jwtUtil,@Lazy  PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        user.getRoles().forEach(role -> {
            logger.info("Role: {}", role.getName());
            role.getPermissions().forEach(permission -> {
                logger.info("Permission: {} - {}", permission.getResource(), permission.getActions());
            });
        });
        Collection<GrantedAuthority> authorities = user.getRoles().stream()
            .flatMap(role -> role.getPermissions().stream())
            .flatMap(permission -> permission.getActions().stream()
                .map(action -> new SimpleGrantedAuthority(permission.getResource() + "_" + action))
            )
            .collect(Collectors.toSet());
            logger.info("Number of authorities: {}", authorities.size());
        logger.info("Granted authorities: {}", authorities);
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }

    public String authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return jwtUtil.generateToken(email);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
