import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import './App.css';

import { Risk } from './types/Risk';

import { RiskForm } from './components/RiskForm';
import { Modal } from './components/Modal';
import { RiskList } from './components/RiskList';

function App() {
	const [risks, setRisks] = useState<Array<Risk>>([]);
	const [modal, setModal] = useState<boolean>(false);

	useEffect(() => {
		const data = localStorage.getItem('risks');
		if (data) {
			setRisks(JSON.parse(data));
		}
	}, []);

	const handleClick = () => {
		setModal(!modal);
	};

	const onAddRisk = (risk: Risk) => {
		risk.id = v4();
		setRisks([...risks, risk]);
		localStorage.setItem('risks', JSON.stringify([...risks, risk]));
		setModal(false);
	};

	const onRemoveRisk = (id: string) => {
		const newRisks = risks.filter((r) => r.id !== id);
		setRisks(newRisks);
		localStorage.setItem('risks', JSON.stringify(newRisks));
	};

	return (
		<>
			<h1>Riesgos</h1>
			<RiskList risks={risks} onRemoveRisk={onRemoveRisk} />
			<div style={{ width: '100%' }}>
				<button className="buttonAddNewRisk" onClick={handleClick}>
					Agregar nuevo
				</button>
			</div>
			<Modal isOpen={modal} onClose={handleClick}>
				<h2>Nuevo Riesgo</h2>
				<RiskForm onSubmitRisk={onAddRisk} />
			</Modal>{' '}
		</>
	);
}

export default App;
