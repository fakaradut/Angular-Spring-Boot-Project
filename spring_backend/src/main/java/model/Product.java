package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "product")
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private long id;

	@Column(name = "p_name")
	@NotNull
	@Size(min = 2, max = 20)
	private String productName;

	@Column(name = "p_number")
	@NotNull
	@Min(1)
	private int productNumber;

	@Column(name = "id_customer")
	@NotNull
	private long idCustomer;

	public Product() {
		super();
	}

	public Product(long id, String productName, int productNumber, long idCustomer) {
		super();
		this.id = id;
		this.productName = productName;
		this.productNumber = productNumber;
		this.idCustomer = idCustomer;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getProductNumber() {
		return productNumber;
	}

	public void setProductNumber(int productNumber) {
		this.productNumber = productNumber;
	}

	public long getIdCustomer() {
		return idCustomer;
	}

	public void setIdCustomer(long idCustomer) {
		this.idCustomer = idCustomer;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
