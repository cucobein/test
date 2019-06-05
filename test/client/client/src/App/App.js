import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './App.css'
import LoadingSpinner from './components/loadingSpinner';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            upperBound: 1000000,
            message: "Waiting...",
            loading: false
        }
    }

    onClick = () => {
        var self = this;
        self.setState({ loading: true }, () => {
            axios.get('/v1/numbers/palindrome/' + this.state.upperBound)
                .then(function (response) {
                    const data = response.data;
                    const success = data.success;
                    const message = data.message;
                    const result = data.result;

                    if (success) {
                        const posts = result;
                        self.setState({ posts: posts, loading: false });
                        console.log(data);
                    } else {
                        self.setState({ message: message, loading: false  })
                        console.log(message);
                    }
                }).catch(function (error) {
                    self.setState({ message: error, loading: false  })
                    console.log(error);
                });
        });
    }

    handleChange(e) {
        this.setState({ upperBound: e.target.value });
    }

    render() {
        return (
            
            <div class="container">
                <div class="jumbotron text-center">
                    <h1>Double-base palindromes</h1>
                    <p>Enter an upper bound number and then click the button in order to obtain a table of double-base palindromes below the input threshold</p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label col-sm-4" for="email">Upper bound:</label>
                            <div class="col-sm-8">
                                <input class="form-control"
                                    type="number"
                                    value={this.state.upperBound}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder="Enter upper bound..." />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary btn-lg btn-block" onClick={this.onClick}>
                            GET PALINDROMES
                        </button>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <h4>Results:</h4>
                </div>
                <div class="row">
                    {this.state.loading ? <LoadingSpinner /> : 
                        <div class="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            {(!this.state.posts) || (this.state.posts.length === 0) ? (
                                <div>{this.state.message}</div>
                            ) : (
                                    <table class="table table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Base 10</th>
                                                <th scope="col">Base 2</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.posts.map(function (number) {
                                                return <tr><td>{number}</td><td>{number.toString(2)}</td></tr>;
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="2"><h5>Total sum: {this.state.posts.reduce((a, b) => a + b, 0)}</h5></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                )}
                        </div>
                    }
                </div>
            </div>
        );
    }

}

export default App;