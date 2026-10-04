package com.orbit.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbit.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByLoginAndRole(String login, User.Role role);
	Optional<User> findByLogin(String login);
	boolean existsByLogin(String login);
	boolean esistsByRole(User.Role role);
	long countByRole(User.Role role);
}
