package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.validation.Valid;

import org.hibernate.hql.spi.id.inline.IdsClauseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import customException.ResourceNotFoundException;
import model.Product;
import repository.ProductRepository;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private EntityManager entityManager;

	private ObjectMapper objectMapper = new ObjectMapper();

	public ProductController(ProductRepository productRepository, EntityManager entityManager) {
		this.productRepository = productRepository;
		this.entityManager = entityManager;
	}

	@GetMapping(value = "/{id}/products")
	public List<Product> allProducts(@PathVariable(value = "id") Long idCustomer) {

		try {
			Query query = entityManager.createQuery("SELECT p FROM Product p WHERE p.idCustomer=:pId");
			query.setParameter("pId", idCustomer);
			List<Product> products = (List<Product>) query.getResultList();
			System.out.println("af");
			return products;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping(value = "/products/{productId}")
	public ResponseEntity<Product> getProduct(@PathVariable(value = "productId") Long productId)
			throws ResourceNotFoundException {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for this id = " + productId));
		return ResponseEntity.ok(product);
	}

	@PostMapping(value = "/product/{id}")
	public Product createProduct(@Valid @RequestBody Product product) {
		return productRepository.save(product);
	}

	@PatchMapping(value = "product/{id}", consumes = "application/json-patch+json")
	public ResponseEntity<Product> patchUpdateProduct(@PathVariable(value = "id") Long productId,
			@RequestBody JsonPatch patch) throws ResourceNotFoundException {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for this id = " + productId));
		Product patchedProduct;
		try {
			patchedProduct = applyPatchToProduct(patch, product);
		} catch (JsonPatchException | JsonProcessingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return ResponseEntity.ok(patchedProduct);
	}

	private Product applyPatchToProduct(JsonPatch patch, Product targetProduct)
			throws JsonPatchException, JsonProcessingException {
		JsonNode patched = patch.apply(objectMapper.convertValue(targetProduct, JsonNode.class));
		return objectMapper.treeToValue(patched, Product.class);
	}

	@PutMapping(value = "/product/update/{productId}")
	public ResponseEntity<Product> updateProduct(@PathVariable(value = "productId") Long productId,
			@Valid @RequestBody Product product) throws ResourceNotFoundException {
		System.out.println("ID: " + productId);
		Product p = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for this id = " + productId));
		p.setProductName(product.getProductName());
		p.setProductNumber(product.getProductNumber());
		final Product updatedProduct = productRepository.save(p);

		return ResponseEntity.ok(updatedProduct);
	}

	@DeleteMapping(value = "/product/delete/{productId}")
	public Map<String, Boolean> deleteProduct(@PathVariable(value = "productId") Long productId)
			throws ResourceNotFoundException {
		System.out.println("ID: " + productId);
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for this id = F" + productId));
		productRepository.delete(product);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted", Boolean.TRUE);
		return response;
	}
}
