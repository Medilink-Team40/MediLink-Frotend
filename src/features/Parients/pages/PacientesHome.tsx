import { Outlet } from "react-router-dom"
import PacientesDashboard from "../components/PacienteDashboard"

const PacienteHome: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Bienvenido Paciente</h1>
            <div className="space-y-4">
                <PacientesDashboard/>
                <Outlet/> 
            </div>
        </div>
    )
}

export default PacienteHome