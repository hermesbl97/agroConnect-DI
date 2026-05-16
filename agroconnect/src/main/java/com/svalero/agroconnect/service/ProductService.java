package com.svalero.agroconnect.service;

import com.svalero.agroconnect.domain.Product;
import com.svalero.agroconnect.exception.ProductNotFoundException;
import com.svalero.agroconnect.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(long id) throws ProductNotFoundException {

        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        return product;
    }

    public Product add(Product product) {
        return productRepository.save(product);
    }

    public Product modify(long id, Product product) throws ProductNotFoundException {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        modelMapper.map(product, existingProduct);
        existingProduct.setId(id);

        return productRepository.save(existingProduct);
    }

    public void delete(long id) throws ProductNotFoundException {

        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        productRepository.delete(product);
    }
}
