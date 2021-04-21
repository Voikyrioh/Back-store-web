import * as React from 'react';
import {getAllSourcesInformations} from "../../services/SourcesService/SourcesServices";

export class SourceInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        getAllSourcesInformations().then(sources => {
            this.setState({
                isLoaded: true,
                items: sources
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }
    
    render() {
        if (this.state.error) {
            return <div>Erreur : {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <ul>
                    {this.state.items.map(item => (
                        <li key={item.name}>
                            {item.name} {item.status}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}