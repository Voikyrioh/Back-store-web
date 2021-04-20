import * as React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:8080/sources/", 
            {
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                }})
            .then(response => response.json())
            .then(reponse => {
                this.setState({
                    isLoaded: true,
                    items: reponse
                });
            },(error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
        })
    }
    
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.name} {item.status}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default App;
