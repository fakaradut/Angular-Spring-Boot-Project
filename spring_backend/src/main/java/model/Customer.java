package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "customer")
public class Customer implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name = "id")
	private long id;

	@Column(name = "name")
	@NotNull
	@Size(min = 2, max = 14)
	private String name;

	@Column(name = "surname")
	@NotNull
	@Size(min = 2, max = 14)
	private String surname;

	@Column(name = "username")
	@NotNull
	@Size(min = 8, max = 14)
	private String username;

	@Column(name = "password")
	@NotNull
	@Size(min = 8, max = 14)
	private String password;

	public Customer() {
		super();
	}

	public Customer(long id, String name, String surname, String username, String password) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
