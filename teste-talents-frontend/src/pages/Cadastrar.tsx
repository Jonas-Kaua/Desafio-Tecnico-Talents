import { useEffect, useState } from 'react';
import { Form, FormGroup, Row, Col, Label, Input, Button, Card, Alert } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useParams  } from "react-router-dom";

function Cadastrar () {

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [authorid, setAuthorid] = useState("");

    const {idRoute} = useParams();

    const [alert, setAlert] = useState(false);

    const history = useNavigate();

    useEffect(()=>{
      if(idRoute){
        getSingleUser(idRoute);
      }
    }, [idRoute]);

    function getSingleUser (idRoute: any) {
      
      axios.get("http://localhost:3030/"+idRoute)
        .then((param) => {
           setId(param.data.id)
           setTitle(param.data.title)
           setIsbn(param.data.isbn)
           setAuthorid(param.data.authorid)
        })
        .catch((error) =>{
            console.log("FAILED" + error);
        })

    };

    function AddEdit(){

        setAlert(false);

        if( title!=null && isbn!=null && authorid!=null && title!="" && isbn!="" && authorid!="" ){

            var data = { title, isbn, authorid } 

            if( id == 0  || id == null){

                axios.post("http://localhost:3030/", data)
                .then(() => {
                    console.log("SUCESS")
                    history("/");
                })
                .catch(() =>{
                    console.log("FAILED")
                })

            }else{

              axios.put("http://localhost:3030/" + id, data)
              .then(() => {
                  console.log("SUCESS")
                  history("/");
              })
              .catch(() =>{
                  console.log("FAILED")
              })

            }

            

        }
        else{
            setAlert(true);
        }
    
    }

    return (

        <div>

            { alert &&
                <Alert color="danger">
                    Preencha todos os campos
                </Alert>
            }
          
          <div style={{textAlign: 'center', marginTop: 50}}>
            <h1>Cadastro de Livro</h1>
          </div>
          
    
          <div style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
    
            <Card
              style={{
                width: '50%',
                height: '57%'
              }}
            >
    
              <Form
                style={{
                  alignSelf: 'center',
                  padding: 15
                }}
              >
                <Row>
    
                  <Col md={6}>
                    <FormGroup>
                      <Label for="title" style={{fontWeight: "bold"}} >
                        Título
                      </Label>
                      <Input
                        id="title"
                        name="name"
                        placeholder="Digite o título do livro"
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                      />
                    </FormGroup>
                  </Col>
    
                  <Col md={6}>
                    <FormGroup>
                      <Label for="isbn" style={{fontWeight: "bold"}} >
                        Código
                      </Label>
                      <Input
                        id="isbn"
                        name="name"
                        placeholder="Digite o código do livro"
                        type="text"
                        value={isbn}
                        onChange={event => setIsbn(event.target.value)}
                      />
                    </FormGroup>
                  </Col>
    
                </Row>
    
                <Row>

                        <Label for="authorid" style={{ fontWeight: "bold" }}>
                            Identificador do Autor
                        </Label>
                        <Col md={4}>
                            <FormGroup>
                                
                                <Input
                                    id="authorid"
                                    name="authorid"
                                    placeholder="0"
                                    type="number"
                                    value={authorid}
                                    onChange={event => setAuthorid(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
    
                </Row>

              </Form>
    
              <Button color="success" onClick={ () => AddEdit()}>
                Salvar
              </Button>
    
            </Card>
    
          </div>

        </div>
    )
}

export default Cadastrar;