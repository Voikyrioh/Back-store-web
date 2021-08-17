import {InfoCircleFilled} from "@ant-design/icons";

export default {
    title: <h3>⛺ Pas besoin de camper !</h3>,
    centered: true,
    icon: '',
    content: <div>
        <p>Il semblerait que tu soit resté connecté trop longtemps, nous t'avons donc déconnecté pour ta sécurité 😉</p>
        <div style={{backgroundColor: '#e0e8ee', color: "steelblue", padding: 10}}>
            <InfoCircleFilled/> <b>Astuce:</b>
            <p style={{paddingLeft: 15, marginBottom: 0}}><i>
                Si ça ne te plaît pas tu peux toujours cocher la case "rester connecter" sur le formulaire de connexion comme ça tu ne sera plus embêté.
            </i></p>
        </div>
    </div>
}
