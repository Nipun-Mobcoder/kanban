package com.example.kanaban.entity;

import java.util.Set;

import com.example.kanaban.Enums.Actions;
import com.example.kanaban.Enums.Resource;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
@Entity
@Table(name = "permissions")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection(targetClass = Actions.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "permission_actions", joinColumns = @JoinColumn(name = "permission_id"))
    @Enumerated(EnumType.STRING)
    private Set<Actions> actions;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Resource resource;

    @ManyToMany(mappedBy = "permissions")
    private Set<Roles> roles;

    public Long getId() {
        return id;
    }

    public Set<Actions> getActions() {
        return actions;
    }

    public Resource getResource() {
        return resource;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setActions(Set<Actions> actions) {
        this.actions = actions;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }
}
