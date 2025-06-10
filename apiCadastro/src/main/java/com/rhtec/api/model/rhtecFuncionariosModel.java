package com.rhtec.api.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table(name = "funcionarios")
@Getter
@Setter
public class rhtecFuncionariosModel {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    Long id;

    @Column(nullable=false)
    String Nome;
    @Column(nullable=false,unique=true)
    String email;
    @Column(nullable=false)
    String Senha;
    @Column(nullable=false , length=8)
    String CEP;
    @Column(nullable=false)
    String endereco;
    @Column(nullable=false)
    String numero;
    @Column(nullable=false)
    String Bairro;
    @Column(nullable=false)
    String Cidade;
    @Column(nullable = false)
    String Estado;




}
