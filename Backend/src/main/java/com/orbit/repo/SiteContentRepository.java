package com.orbit.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbit.model.SiteContent;

@Repository
public interface SiteContentRepository extends JpaRepository<SiteContent, Long> {

}
