package com.orbit.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.orbit.model.User;
import com.orbit.repo.UserRepository;
import com.orbit.service.SiteService;


@Component 
public class DataSeeder {

  private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

  
  private final UserRepository users;
  private final PasswordEncoder encoder;
  private final SiteService site;
  private final String adminUser;
  private final String adminPass;

  public DataSeeder(UserRepository users, PasswordEncoder encoder, SiteService site, String adminUser, String adminPass) {
    this.users = users;
    this.encoder = encoder;
    this.site = site;
    this.adminUser = adminUser;
    this.adminPass = adminPass;
  }

  public void run(String... args) {
    if(!users.existsByRole(User.Role.ADMIN)) {
      User admin = new User();
      admin.setName("Administrator");
      admin.setLogin(adminUser);
      admin.setPassword(encoder.encode(adminPass));
      admin.setRole(User.Role.ADMIN);
      users.save(admin);

      log.info("Created admin account '{}'",adminUser);

      if("change-me-now".equals(adminPass)) {
        log.warn("Admin is using the default password. Set the ADMIN_PASSWORD before deploaying!");
      }

      site.get();
    }
  }
}
