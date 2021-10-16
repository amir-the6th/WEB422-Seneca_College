import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
//import Accordion from 'react-bootstrap/Accordion';

function About() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card bg={'light'} className="mb-2">
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/4268520/pexels-photo-4268520.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="About Header"
              />
              <Card.ImgOverlay className="ml-4 mt-4">
                <Card.Title>About Amir</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Web Developer - Marketing Specialist
                </Card.Subtitle>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>Work Experience</Card.Title>
              <hr />
              <Card.Subtitle className="mb-4 text-muted">
                This page gets updated. Stay tuned!
              </Card.Subtitle>
            </Card.Body>

            {/* <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>Education</Card.Title>
              <hr />
              <Card.Subtitle className="mb-4 text-muted">
                This page gets updated. Stay tuned!
              </Card.Subtitle>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default About;
