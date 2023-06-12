import { useState } from 'react';
import { Risk } from '../types/Risk';
import { CanvasMeter } from './CanvasMeter';
import { Modal } from './Modal';
import './RiskItem.modules.css';

interface RiskItemProps {
	risk: Risk;
	onRemoveRisk: (id: string) => void;
}

export function RiskItem({ risk, onRemoveRisk }: RiskItemProps) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<div onClick={handleClick} className="riskItem">
				<button
					className="riskItem__remove"
					onClick={() => onRemoveRisk(risk.id)}
				>
					x
				</button>
				<p className="riskItem__paragraph">Servicio: {risk.service}</p>
				<p className="riskItem__paragraph">
					Consecuencias: {risk.consequences}
				</p>
				<p className="riskItem__paragraph">Tratamiento: {risk.treatment}</p>
				{risk.controls.map((control) => (
					<p key={crypto.randomUUID()} className="riskItem__paragraph">
						Controles: {control.name}
					</p>
				))}

				<p className="riskItem__paragraph">
					Ri:
					<CanvasMeter meter={risk.ri} />
				</p>
				<p className="riskItem__paragraph">
					Rr:
					<CanvasMeter meter={risk.rr} />
				</p>
			</div>

			<Modal isOpen={showModal} onClose={handleClick}>
				<h3>Identificación y valoración</h3>
				<p>Servicio: {risk.service}</p>
				<p>Consecuencias: {risk.consequences}</p>
				<p>Vulnerabilidad o Amenaza: {risk.vulnerabilityOrThreat}</p>
				<h3>Riesgo inherente</h3>
				<p>Probabilidad: {risk.riProbability}</p>
				<p>Impacto: {risk.riImpact}</p>
				<p>Riesgo inherente:</p>
				<CanvasMeter meter={risk.ri} width={300} />
				<h3>Mitigación y control</h3>
				<p>Tratamiento: {risk.treatment}</p>
				<div>
					{risk.controls.map((control) => (
						<p key={crypto.randomUUID()} className="riskItem__paragraph">
							Controles: {control.name}
						</p>
					))}
				</div>
				<h3>Riesgo residual</h3>
				<p>Probabilidad: {risk.rrProbability}</p>
				<p>Impacto: {risk.rrImpact}</p>
				<p>Riesgo residual:</p>
				<CanvasMeter meter={risk.rr} width={300} />
			</Modal>
		</>
	);
}
