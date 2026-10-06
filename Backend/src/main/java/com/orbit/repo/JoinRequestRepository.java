package com.orbit.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbit.model.JoinRequest;

@Repository
public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long>{

}
