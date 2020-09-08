package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.Customer;

@Repository
public interface CustomerRespository extends JpaRepository<Customer, Long> {

}
