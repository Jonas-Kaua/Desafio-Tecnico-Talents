import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, PaginationItem, PaginationLink, Label, Input, Col, FormGroup, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home (){

    const [lista, setLista] = useState<Array<any>>([]);

    const history = useNavigate();

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const [showSearchAlert, setShowSearchAlert] = useState(false);

    function GetLista(){

        axios.get("http://localhost:3030/")
        .then((param) => {
           setLista(param.data);
        })
        .catch((error) =>{
            console.log("FAILED" + error);
        })

    }
    
    function Buscar(search? : any){

        if(search){
            axios.get("http://localhost:3030/buscar/" + search)
            .then((param) => {
               console.log(param.data) 
               if(param.data.length > 0 ){
                  setLista(param.data);
               }else{
                GetLista(); 
               } 
            })
            .catch((error) =>{
                console.log("FAILED" + error);
            })
        }else{
            GetLista();
        }  

    }

    function Delete(idRoute: any){

        axios.delete("http://localhost:3030/" + idRoute)
        .then(() => {
            console.log("DELETE SUCESS");
            window.location.reload();
         })
         .catch(() =>{
            console.log("DELETE FAILED");
         })

    }

    function Editar(item : any){
        
        history("/editar/" + item.id);
    
    }

    useEffect(()=>{
        GetLista();
    }, []);

    return (
        <div>

            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <h1>Lista de Livros</h1>
            </div>


            <div style={{ width: '70%', margin: 'auto' }}>

                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="search" style={{ fontWeight: "bold" }} >
                                Filtro
                            </Label>
                            <div style={{ display: 'flex'}}>
                                <Input
                                    id="search"
                                    name="search"
                                    placeholder="Search"
                                    type="text"
                                    value={search}
                                    onChange={event => setSearch(event.target.value)}
                                />
                                <Button color='primary' onClick={ () => Buscar( search ) }>
                                    Buscar
                                </Button>
                            </div>
                        </FormGroup>
                    </Col>

                </Row>
                    
                <div style={{ textAlign: 'right' }}>
                    <Link to='/cadastrar'>
                        <Button color='primary'>
                            + Cadastrar
                        </Button>
                    </Link>
                </div>

                <Table dark >
                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Título</th>
                            <th>Código</th>
                            <th style={{ textAlign: 'center' }}>Identificador do Autor</th>
                            <th style={{ textAlign: 'center' }}>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista && lista.map((item, index) => (
                            <tr key={index} >
                                <th scope="row">{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.isbn}</td>
                                <td style={{ textAlign: 'center' }}>{item.authorid}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button color='success' onClick={ () => Editar(item)}>
                                        Editar
                                    </Button>
                                    <Button color='danger' onClick={ () => Delete(item.id)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                
                <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink href="#">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            4
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            5
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>
                </Pagination>
                
            </div>
        </div>
    )

}

export default Home