import { Navbar, NavbarBrand } from 'reactstrap';

function Header (){
    return (

        <nav>
    
          <Navbar
            color="dark"
            dark
          >
            <NavbarBrand href="/">
              <img
                alt="logo"
                src="/vite.svg"
                style={{
                  height: 40,
                  width: 40
                }}
              />
              Desafio Técnico - Desenvolvedor de Software Full Stack - Jonas Kauã
            </NavbarBrand>
          </Navbar>
    
        </nav>
    
    );
}

export default Header