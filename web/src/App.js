import React, { Component } from 'react';
import './App.css';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, TabContent, TabPane, Nav, NavItem, NavLink, Row
} from "reactstrap";
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      romanNumber: '',
      romanResponse: '',
      numericNumber: '',
      numericResponse: '',
    }
    this.romanChange = this.romanChange.bind(this);
    this.numericChange = this.numericChange.bind(this);

    this.handleToNumeric = this.handleToNumeric.bind(this);
    this.handleToRoman = this.handleToRoman.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  romanChange(event) {
    this.setState({
      romanNumber: event.target.value
    })
  }

  numericChange(event) {
    this.setState({
      numericNumber: event.target.value
    })
  }

  handleToNumeric = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/v1/convertToNumeric?number=${this.state.romanNumber}`);
    try {
      const body = await response.json();
      this.setState({ romanResponse: body.message })
    } catch (error) {
      throw Error(error)
    }
  }

  handleToRoman = async (event) => {
    event.preventDefault();    
    const response = await fetch(`/api/v1/convertToRoman?number=${this.state.numericNumber}`);
    try {
      const body = await response.json();
      this.setState({ numericResponse: body.message })
    } catch (error) {
      throw Error(error)
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <Container className="container-fluid">
        <h2 className="text-center">Roman Conversor</h2>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Numeric to Roman
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Roman to numeric
            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <h4>Numeric to Roman</h4>
                  <Form className="form center" onSubmit={this.handleToRoman}>
                    <Col>
                      <FormGroup>
                        <Label>Number</Label>
                        <Input
                          type="text"
                          name="numeric"
                          id="numeric"
                          placeholder="Insert a number ex: 123"
                          onChange={this.numericChange}
                        />
                      </FormGroup>
                    </Col>
                    <Button>Calculate</Button>
                     <Label value={this.state.numericResponse}>Result: {this.state.numericResponse}</Label>
                  </Form>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <h4>Roman to numeric</h4>
                  <Form className="form center" onSubmit={this.handleToNumeric}>
                    <Col>
                      <FormGroup>
                        <Label>Roman</Label>
                        <Input
                          type="text"
                          name="roman"
                          id="roman"
                          placeholder="Insert Roman Number ex: XVI"
                          onChange={this.romanChange}
                        />
                      </FormGroup>
                    </Col>
                    <Button>Calculate</Button>
                    <Label value={this.state.romanResponse}>Result: {this.state.romanResponse}</Label>
                  </Form>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Container>
    );
  }
}
export default App;
