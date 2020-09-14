package com.springjpa.controller;

import java.util.Arrays;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springjpa.model.Customer;
import com.springjpa.repo.CustomerRepository;

import jdk.internal.module.Modules;

@RestController
public class WebController {
	@Autowired
	CustomerRepository repository;
		
	/*@RequestMapping("/aa")
	public String getServerInfo(Map<String, Object> model){
	    model.put("message", "server info");
	    return "/index";
	} */
	
    /*@RequestMapping("/")
    public String index() {
        return "index.html";
    }
    */
	
    @RequestMapping(value = "/index")
    public String index() {
       return "index";
    }
	/*
	@RequestMapping("/index.html")
	public String index1() {
	   return "forward:index.html";
	}
	
	*/
	
	@RequestMapping("/save")
	public String process(){
		// save a single Customer
		repository.save(new Customer("Jack", "Smith"));
		repository.save(new Customer("John","Petersburg"));
		// save a list of Customers
		repository.save(Arrays.asList(new Customer("Adam", "Johnson"), new Customer("Kim", "Smith"),
										new Customer("David", "Williams"), new Customer("Peter", "Davis")));
		
		return "Done";
	}
	
	@RequestMapping("/ol/source")
	public String olSource(){
	//Modules.addExports("ol");
		return "Done";
	}
	
	@RequestMapping("/findall")
	public String findAll(){
		String result = "";
		
		for(Customer cust : repository.findAll()){
			result += cust.toString() + "<br>";
		}
		
		return result;
	}
	
	@RequestMapping("/del")
	public String deleteById(@RequestParam("id") long id){
		String result = "";
		result = repository.findOne(id).toString();
		Customer result1 = repository.findOne(id);
		repository.delete(result1);
		return result;
	}
	
	
	@RequestMapping("/findbyid")
	public String findById(@RequestParam("id") long id){
		String result = "";
		result = repository.findOne(id).toString();
		return result;
	}
	
	@RequestMapping("/findbylastname")
	public String fetchDataByLastName(@RequestParam("lastname") String lastName){
		String result = "";
		
		for(Customer cust: repository.findByLastName(lastName)){
			result += cust.toString() + "<br>"; 
		}
		
		return result;
	}
}

