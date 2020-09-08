package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import customException.ResourceNotFoundException;
import model.Customer;
import repository.CustomerRespository;

@RestController
@RequestMapping(value = "/api/customer")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

	@Autowired
	private CustomerRespository customerRespository;

	@Autowired
	private EntityManager entityManager;

	public CustomerController(CustomerRespository customerRespository, EntityManager entityManager) {
		this.customerRespository = customerRespository;
		this.entityManager = entityManager;
	}

	@GetMapping(value = "/{username}/{password}")
	public ResponseEntity<Customer> getCustomer(@PathVariable(value = "username") String username,
			@PathVariable(value = "password") String password) throws Exception {
		Query query = entityManager.createQuery("Select c from Customer c where c.username=:pUsername");
		query.setParameter("pUsername", username.trim());
		List<Customer> customer = query.getResultList();
		 
		if (customer.size() == 0) {
			throw new ResourceNotFoundException("Customer not found by " + username);
		} else if (!((Customer) customer.get(0)).getPassword().trim().equals(password.trim())) {
			throw new Exception("Wrong password");
		}
		return ResponseEntity.ok(customer.get(0));
	}

	@PostMapping(value = "create")
	public Customer createCustomer(@Valid @RequestBody Customer customer) {
		return customerRespository.save(customer);
	}

	@PutMapping(value = "update/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable(value = "id") Long id,
			@Valid @RequestBody Customer customer) throws ResourceNotFoundException {
		Customer c = customerRespository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found.") {
				});
		c.setName(customer.getName());
		c.setSurname(customer.getSurname());
		c.setPassword(customer.getPassword());
		c.setName(customer.getName());
		final Customer customerUpdated = customerRespository.save(c);
		return ResponseEntity.ok(customerUpdated);
	}

	@DeleteMapping(value = "delete/{id}")
	public Map<String, Boolean> deleteCustomer(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		Customer customer = customerRespository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found."));
		customerRespository.delete(customer);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Delete", Boolean.TRUE);
		return response;
	}
}

//XXX yeniden tablo YAP
//XXX router navigate ile parametre gidebiliyor
//XXX patch i arastir , route.snapshat.params[adres] ile o sayfaya gidebiliyor 
//XXX eger /:id gibi yazilirsa :id parametrik ifade oluyor!

/*
 * router ile gidilecek rota , activatedRouter ile o sayfaya gelen routera
 * erisiliyor yani eger parametre almak istiyorsak activated kullanilacak
 * 
 * @Valid ile modeldeki validations larla uyumlu mu diye kontrol edilir
 * 
 */
// XXX RequestBody aldigi json verisini java objesine donusturuyor
