import { Risk } from '../types/Risk';
import { RiskItem } from './RiskItem';

import './RiskList.modules.css';

interface RiskListProps {
	risks: Risk[];
	onRemoveRisk: (id: string) => void;
}

export function RiskList({ risks, onRemoveRisk }: RiskListProps) {
	return (
		<div className="risk__list">
			{risks.map((risk) => (
				<RiskItem key={risk.id} onRemoveRisk={onRemoveRisk} risk={risk} />
			))}
		</div>
	);
}
